import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserLookupItemModel } from 'src/app/shared/common/interfaces/lookup-item-text';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { SelectOption } from 'src/app/shared/modules/form-control/interface/select-option.interface';
import { Roles } from '../../roles/interfaces/roles.inteface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  constructor(private userService: UserService) {}

  fetchSalutationList(): Observable<SelectOption[]> {
    return this.userService.getSalutationList().pipe(
      map((data: ResponseModel<UserLookupItemModel[]>) =>
        data.data.map((file: UserLookupItemModel) => ({
          id: file.lookupItemId,
          key: file.lookupItemText,
          value: file.lookupItemText,
        })),
      ),
    );
  }

  fetchRoleList(): Observable<SelectOption[]> {
    return this.userService.getRoleList().pipe(
      map((data: ResponseModel<Roles[]>) =>
        data.data.map((file: Roles) => ({
          id: file.id,
          key: file.name,
          value: file.name,
        })),
      ),
    );
  }
}
