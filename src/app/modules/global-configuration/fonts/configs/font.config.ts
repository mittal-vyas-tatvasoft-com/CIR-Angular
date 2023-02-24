export const FontControl = {
    nameField: {
        value: '',
        key: 'nameField',
        label: 'Name',
        inputType: 'text',
        required: true,
        requiredErrMsg: 'Name is required.',
    },
    fontFamilyField: {
        value: '',
        key: 'fontFamilyField',
        label: 'Font Family',
        inputType: 'text',
        required: true,
        requiredErrMsg: 'Font Family is required.',
    },
    enabledField: {
        inputType: 'boolean',
        value: true,
        key: 'enabledField',
        label: 'Enabled',
        required: false,
    },
}