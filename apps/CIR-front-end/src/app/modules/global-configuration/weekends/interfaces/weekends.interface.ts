export interface GlobalConfigurationWeekends {
  id: number;
  countryId: number;
  dayOfWeekId: number;
}

export interface WeekendModel {
  id: number;
  countryId: number;
  dayOfWeekId: number;
  countryName: string;
  countryCode: string;
  dayOfWeek: string | undefined;
}

export interface GlobalConfigurationWeekendModel {
  weekendList: WeekendModel[];
  count: number;
}
