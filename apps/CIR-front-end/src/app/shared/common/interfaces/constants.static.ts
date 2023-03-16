export const defaultPageSizeOption = [10, 25, 50];
export const defaultCurrentPage = 0;
export const defaultTotalCount = 0;
export const snackBarDuration = 5000;
export const defaultCountryId = 1;
export const defaultCultureId = 1;
export const defaultDateFormat = 'dd/MM/yyyy';
export const defaultMessagesEditorTitle = [
  { id: 0, text: 'Welcome Message', hide: false },
  { id: 1, text: 'Final Message', hide: false },
  { id: 2, text: 'Refund Message', hide: false },
  { id: 3, text: 'Maintenance Mode Message', hide: false },
  { id: 4, text: 'Return Details Message', hide: false },
  { id: 5, text: 'Tracking Welcome Message', hide: false },
  { id: 6, text: 'Print Label Welcome Message', hide: false },
];
export const fieldTypes = [
  { id: 0, msg: 'Service - Postal', hide: false },
  { id: 1, msg: 'Service - Drop Off', hide: false },
  { id: 2, msg: 'Service - Collection', hide: false },
  { id: 3, msg: 'Booking Form', hide: false },
];
export const dynamicFields = [
  { fieldTypeId: 1, fieldName: 'Reference' },
  { fieldTypeId: 1, fieldName: 'BookingId' },
  { fieldTypeId: 1, fieldName: 'CollectionDate' },
  { fieldTypeId: 1, fieldName: 'CollectionAddress' },
  { fieldTypeId: 1, fieldName: 'TrackingURL' },
  { fieldTypeId: 1, fieldName: 'LabelURL' },
  { fieldTypeId: 2, fieldName: 'OrderNumber' },
  { fieldTypeId: 2, fieldName: 'CustomerEmail' },
  { fieldTypeId: 2, fieldName: 'CustomerName' },
  { fieldTypeId: 2, fieldName: 'BookingURL' },
];
export const defaultSelectCountryName = {
  id: 0,
  key: 'All Country Name',
  value: 'All Country Name',
};
export const defaultSelectCountryCode = {
  id: 0,
  key: 'All Country Code',
  value: 'All Country Code',
};
export const defaultSelectOptionRole = {
  id: 0,
  key: 'All Roles',
  value: 'All Roles',
};
export const defaultSelectOptionClient = {
  id: 0,
  key: 'Select Client',
  value: 'Select Client',
};
export const defaultSelectOptionPortal = {
  id: 0,
  key: 'Select Portal',
  value: 'Select Portal',
};
export const GlobalSiteId = 10;
export const DefaultCultureId = 1;
