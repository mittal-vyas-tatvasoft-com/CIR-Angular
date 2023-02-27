import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Navigation } from 'src/app/shared/common/enum';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { RolePermissionService } from 'src/app/shared/services/role-permission/role-permission.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { roleControl } from '../../configs/role.config';
import { nanoid } from 'nanoid';
import {
  RolePermissionModel,
  SubRolesModel,
  RoleGrouping2SubSiteModel,
  RoleGrouping2CultureModel,
  RoleGrouping2PermissionModel,
} from '../../interfaces/role-permission.interface';
import {
  RoleSection,
  TreeWithId,
  Field,
  OptionsList,
  TreeNode,
} from '../../interfaces/role-section.interface';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss'],
})
export class AddEditRoleComponent implements OnInit {
  form: FormGroup;
  sectionForm: FormGroup;
  roleId: number;
  roleData: RolePermissionModel;
  selectedSectionId: string | number | undefined;

  permissionField = roleControl.permissionField;
  roleField = roleControl.roleField;
  descriptionField = roleControl.descriptionField;
  wrongLoginAttemptsField = roleControl.wrongLoginAttemptsField;
  roleControl = roleControl;
  sections: RoleSection[] = [];
  treeViewData: TreeWithId[] = [];

  site: Field[] = [];
  language: Field[] = [];
  privilege: Field[] = [];
  ngUnsubscribe$ = new Subject<void>();
  expand = 'chevron_right';
  collapse = 'expand_more';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private rolePermissionService: RolePermissionService,
    private snackBarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.roleId = this.route.snapshot.params['id'];
    this.createForm();
    this.getAllLists();
  }

  createForm() {
    this.form = this.fb.group({
      roleField: ['', [Validators.required]],
      descriptionField: ['', [Validators.required]],
      wrongLoginAttemptsField: ['', [Validators.required]],
      permissionField: [false],
      sitesField: [[]],
      languagesField: [[]],
      privilegesField: [[]],
    });
    this.sectionForm = this.fb.group({
      sitesField: [[], [Validators.required]],
      languagesField: [[], [Validators.required]],
      privilegesField: [[], [Validators.required]],
    });
  }

  addSelection() {
    const { sitesField, languagesField, privilegesField } =
      this.sectionForm.value;

    this.sections = [
      ...this.sections.filter((section) => section[this.getIdKey(section)]),
      {
        sId: nanoid(),
        sites: sitesField,
        languages: languagesField,
        privileges: privilegesField,
      },
    ];

    this.resetSectionForm();
    this.generateRolesTree();
  }

  updateSelection() {
    if (this.selectedSectionId) {
      const { sitesField, languagesField, privilegesField } =
        this.sectionForm.value;

      this.sections.forEach((section) => {
        if (section[this.getIdKey(section)] === this.selectedSectionId) {
          section.sites = sitesField;
          section.languages = languagesField;
          section.privileges = privilegesField;
        }
      });
      this.resetSectionForm();
      this.generateRolesTree();
      this.selectedSectionId = undefined;
    }
  }

  removeSelection() {
    let isSectionExist = false;
    if (this.selectedSectionId) {
      this.sections = this.sections.filter((section) => {
        const key = this.getIdKey(section);
        const isSectionNotSelected = section[key] != this.selectedSectionId;
        if (isSectionNotSelected == false && key === 'id') {
          isSectionExist = true;
        }
        return isSectionNotSelected;
      });
      if (isSectionExist) {
        this.roleService
          .removeSection(this.selectedSectionId)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe(() => {
            //
          });
      }
      this.resetSectionForm();
      this.generateRolesTree();
      this.selectedSectionId = undefined;
    }
  }

  getRoles() {
    return this.sections.map((section) => ({
      groupId: section.id ? section.id : undefined,
      site: section.sites.map((site) => ({
        siteId: site.value,
        languages: section.languages.map((language) => ({
          cultureId: language.value,
          privileges: section.privileges.map((privilege) => ({
            privilegesId: privilege.value,
          })),
        })),
      })),
    }));
  }

  save() {
    const payload = {
      id: this.roleId ? this.roleId : undefined,
      name: this.form.value.roleField,
      description: this.form.value.descriptionField,
      wrongLoginAttempts: this.form.value.wrongLoginAttemptsField,
      allPermissions: this.form.value.permissionField,
      roles: this.getRoles(),
    };
    if (this.form.valid) {
      if (this.roleId) {
        this.roleService
          .put(payload)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe({
            next: (res: ResponseModel<RolePermissionModel>) => {
              if (res.result) {
                if (this.rolePermissionService.userRoleId == this.roleId) {
                  this.roleService
                    .get(this.roleId)
                    .subscribe((res: ResponseModel<RolePermissionModel>) => {
                      if (res.result) {
                        this.rolePermissionService.transformRoles(res.data);
                        this.router
                          .navigate([`${Navigation.Admin}/${Navigation.Role}`])
                          .then(() => {
                            location.reload();
                          });
                      } else {
                        this.snackBarService.error(res.message);
                      }
                    });
                } else {
                  this.snackBarService.success(res.message);
                  this.router.navigate([
                    `${Navigation.Admin}/${Navigation.Role}`,
                  ]);
                }
              } else {
                this.snackBarService.error(res.message);
              }
            },
            error: (err) => {
              this.snackBarService.error(err.message);
            },
          });
      } else {
        this.roleService
          .post(payload)
          .pipe(takeUntil(this.ngUnsubscribe$))
          .subscribe({
            next: (res: ResponseModel<RolePermissionModel>) => {
              if (res.result) {
                this.snackBarService.success(res.message);
                this.router.navigate([
                  `${Navigation.Admin}/${Navigation.Role}`,
                ]);
              } else {
                this.snackBarService.error(res.message);
              }
            },
            error: (err) => {
              this.snackBarService.error(err.message);
            },
          });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  getSelectionControl(key: string): FormControl {
    return this.sectionForm.get(key) as FormControl;
  }

  getAllLists() {
    this.roleService
      .allSites()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ResponseModel<OptionsList[]>) => {
        const siteData: Field[] = [];
        res.data.forEach((element: OptionsList) => {
          if (element.displayName !== undefined) {
            siteData.push({
              label: element.displayName,
              value: element.id,
            });
          }
        });
        this.site = siteData;
      });
    this.roleService
      .allEnableLanguages()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ResponseModel<OptionsList[]>) => {
        const languageData: Field[] = [];
        res.data.forEach((element: OptionsList) => {
          if (element.displayName !== undefined) {
            languageData.push({
              label: `${element.displayName} (${element.nativeName})`,
              value: element.id,
            });
          }
        });
        this.language = languageData;
      });
    this.roleService
      .allPrivileges()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ResponseModel<OptionsList[]>) => {
        const privilegeData: Field[] = [];
        res.data.forEach((element: OptionsList) => {
          if (element.displayName !== undefined) {
            privilegeData.push({
              label: element.displayName,
              value: element.id,
            });
          }
        });
        this.privilege = privilegeData;
        if (this.roleId) {
          this.getRoleData(this.roleId);
        }
      });
  }
  isAnySections() {
    return this.treeViewData.length > 0;
  }

  generatePrivilegeTree(section: RoleSection) {
    const treeView: TreeNode[] = [];
    section.privileges.forEach((privilege: Field) => {
      treeView.push({
        name: privilege.label,
      });
    });
    return treeView;
  }

  generateLanguageTree(section: RoleSection) {
    const treeView: TreeNode[] = [];
    section.languages.forEach((language: Field) => {
      treeView.push({
        name: language.label,
        children: this.generatePrivilegeTree(section),
      });
    });
    return treeView;
  }

  generateRolesTree() {
    const treeView: TreeWithId[] = [];

    if (this.sections && this.sections.length > 0) {
      this.sections.forEach((element) => {
        const sectionView: TreeNode[] = [];
        element.sites.forEach((site: Field) => {
          sectionView.push({
            name: site.label,
            children: this.generateLanguageTree(element),
          });
        });
        const value = element[this.getIdKey(element)];
        if (value) {
          treeView.push({
            id: value,
            data: sectionView,
          });
        }
      });
    }
    this.treeViewData = treeView;
  }

  getIdKey(section: RoleSection) {
    return section.sId ? 'sId' : 'id';
  }

  onSectionClick(id: string | number) {
    if (this.selectedSectionId === id) {
      this.selectedSectionId = undefined;
      this.resetSectionForm();
    } else {
      this.selectedSectionId = id;
      const selectedSection = this.sections.find(
        (item) => item[this.getIdKey(item)] === this.selectedSectionId,
      );
      if (selectedSection) {
        this.sectionForm.get('sitesField')?.setValue(selectedSection.sites);
        this.sectionForm
          .get('languagesField')
          ?.setValue(selectedSection.languages);
        this.sectionForm
          .get('privilegesField')
          ?.setValue(selectedSection.privileges);
      }
    }
  }

  resetSectionForm() {
    this.sectionForm.get('sitesField')?.setValue([]);
    this.sectionForm.get('languagesField')?.setValue([]);
    this.sectionForm.get('privilegesField')?.setValue([]);
  }

  getValueLabel(value: number, type?: string) {
    let valueLabel;

    switch (type) {
      case 'site':
        this.site.find((site) => {
          if (site.value === Number(value)) {
            valueLabel = site.label;
          }
        });
        return valueLabel;
      case 'language':
        this.language.find((language) => {
          if (language.value === Number(value)) {
            valueLabel = language.label;
          }
        });
        return valueLabel;
      case 'privilege':
        this.privilege.find((privilege) => {
          if (privilege.value === Number(value)) {
            valueLabel = privilege.label;
          }
        });
        return valueLabel;
      default:
        return 'not reached';
    }
  }

  getRoleData(id: number) {
    this.roleService
      .get(id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<RolePermissionModel>) => {
          if (res.result) {
            this.roleData = res.data;
            this.form
              .get('permissionField')
              ?.setValue(this.roleData.allPermissions);
            this.form.get('roleField')?.setValue(this.roleData.name);
            this.form
              .get('descriptionField')
              ?.setValue(this.roleData.description);
            this.form
              .get('wrongLoginAttemptsField')
              ?.setValue(this.roleData.wrongLoginAttempts);

            if (!this.roleData.allPermissions) {
              this.roleData.roles.forEach((element: SubRolesModel) => {
                this.sections.push({
                  id: Number(element.groupId),
                  sites: this.getSiteSections(element),
                  languages: this.getLanguageSections(element.site[0]),
                  privileges: this.getPrivilegeSections(
                    element.site[0].languages[0],
                  ),
                });
              });
              this.generateRolesTree();
            }
          } else {
            this.snackBarService.error(res.message);
          }
        },
        error: (err) => {
          this.snackBarService.error(err.message);
        },
      });
  }

  getSiteSections(section: SubRolesModel) {
    const sites: Field[] = [];
    section.site.forEach((site: RoleGrouping2SubSiteModel) => {
      const siteLabel = this.getValueLabel(site.siteId, 'site');
      if (siteLabel !== undefined) {
        sites.push({
          label: siteLabel,
          value: Number(site.siteId),
        });
      }
    });
    return sites;
  }

  getLanguageSections(section: RoleGrouping2SubSiteModel) {
    const languages: Field[] = [];
    section.languages.forEach((language: RoleGrouping2CultureModel) => {
      const siteLabel = this.getValueLabel(language.cultureId, 'language');
      if (siteLabel !== undefined) {
        languages.push({
          label: siteLabel,
          value: Number(language.cultureId),
        });
      }
    });
    return languages;
  }

  getPrivilegeSections(section: RoleGrouping2CultureModel) {
    const privileges: Field[] = [];

    section.privileges.forEach((privilege: RoleGrouping2PermissionModel) => {
      const siteLabel = this.getValueLabel(privilege.privilegesId, 'privilege');
      if (siteLabel !== undefined) {
        privileges.push({
          label: siteLabel,
          value: Number(privilege.privilegesId),
        });
      }
    });
    return privileges;
  }

  cancel() {
    this.router.navigate([`${Navigation.Admin}/${Navigation.Role}`]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
