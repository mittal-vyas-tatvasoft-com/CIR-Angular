import { Navigation, Permissions } from '../../shared/common/enum';

export const navBarRoutes = {
  downArrowIcon: 'keyboard_arrow_down',
  UsersConfig: {
    Components: [
      {
        label: 'Users',
        path: `./${Navigation.User}`,
        privilegeId: Permissions.USER_LIST,
      },
      {
        label: 'Roles',
        path: `./${Navigation.Role}`,
        privilegeId: Permissions.ROLES_LIST,
      },
    ],
    label: 'Users',
    icon: 'supervisor_account',
  },

  GlobalConfigs: {
    Components: [
      {
        label: 'Currencies',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.Currencies}`,
      },
      {
        label: 'Cut-Off Times',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.CutOffTimes}`,
      },
      {
        label: 'Dropdown Options',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.DropdownOption}`,
      },
      {
        label: 'Fonts',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.Font}`,
      },
      {
        label: 'Holidays',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.Holidays}`,
      },
      {
        label: 'Messages',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.Messages}`,
        privilegeId: Permissions.MESSAGES_LIST,
      },
      {
        label: 'Styles',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.Style}`,
      },
      {
        label: 'Emails',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.Email}`,
      },
      {
        label: 'Weekends',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.Weekends}`,
      },
      {
        label: 'Fields',
        path: `./${Navigation.GlobalConfiguration}/${Navigation.Fields}`,
      },
    ],
    label: 'Global Configs',
    icon: 'perm_data_setting',
  },

  Websites: {
    Components: [
      {
        label: 'Add New Portal',
        path: `${Navigation.Portal}/${Navigation.clients}`,
      },
    ],
    label: 'Websites',
    icon: 'mouse',
  },

  Utilities: {
    Components: [
      {
        label: 'lookups',
        path: `./${Navigation.Utilities}/${Navigation.Lookups}`,
      },
      {
        label: 'Languages',
        path: `./${Navigation.Utilities}/${Navigation.Languages}`,
      },
    ],
    label: 'Utilities',
    icon: 'perm_data_setting',
  },
};
