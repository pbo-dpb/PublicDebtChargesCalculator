import collect from "collect.js";
import { staticYears } from './static-variables'

export class FiscalYears {
    constructor() {
        let previousYear = null;
        let counter = 0;
        this.years = collect(staticYears).mapWithKeys(yr => {
            yr.previousYearId = previousYear ? ("" + previousYear.label) : null;
            yr.counter = counter;
            previousYear = yr;
            counter++;
            return [yr.label, yr];
        }).all();
    }

    /**
     * Array of user visible years.
     * @returb {array}
     */
    get displayYears() {
        return collect(this.years).reject(year => year.hidden).items;
    }


    /**
    *  Dynamically called functions
    */


    annualPublicDebtChargeForYear(year) {

    }


    // Imported from econ outlook
    day90TreasuryBillsRateForYear(year) {
        return year.day90TreasuryBillsRate;
    }

    // Calculated from fiscal model import
    marginalEffectiveInterestRateAllNewDebtForYear(year) {
        return year.marginalEffectiveInterestRateAllNewDebt;
    }

    // From fiscal model import
    mediumTermBondRateForYear(year) {
        return year.mediumTermBondRate;
    }

    // From fiscal model import
    longTermBondRateForYear(year) {
        return year.longTermBondRate;
    }

}