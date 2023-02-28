export const currenciesControl = {
  countryField: {
    key: 'country',
    value: '',
    label: 'country',
    inputType: 'text',
  },
};

export const addNewCurrencyControl = {
  symbolField: {
    key: 'symbol',
    value: '',
    label: 'Symbol',
    inputType: 'text',
    requiredErrMsg: 'Symbol is required',
  },
  codeNameField: {
    key: 'codeName',
    value: '',
    label: 'Code Name',
    inputType: 'text',
    requiredErrMsg: 'Currency Code Name is required',
  },
};
