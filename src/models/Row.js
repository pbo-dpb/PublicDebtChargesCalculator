export default class {
    constructor() {
        this.id = null;
        this.row = null;
        this.label = {
            en: null,
            fr: null
        }
        this.groupName = {
            en: null,
            fr: null
        }
        this.description = {
            en: null,
            fr: null
        }
        this.warning = {
            en: null,
            fr: null
        }
        this.unit = null;
        this.fiscalYears = {};
        this.is_static = null;
    }

    getUserValueStorageKeyForFiscalYear(fiscalYear) {
        // Return a string that contains only letters, numbers, and underscores and starts with a letter for use as a key in localStorage
        return `urowv_${this.id}_${fiscalYear}`.replace(/[^a-zA-Z0-9_]/g, '_');
    }
}