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
    *  Dynamic getters called by UI render
    */
    netChangeOnPrimaryBalanceForYear(year) {
        return year.netChangeOnPrimaryBalance;
    }

    // Imported from econ outlook
    day90TreasuryBillsRateForYear(year) {
        return year.day90TreasuryBillsRate;
    }

    // Calculated from fiscal model import
    marginalEffectiveInterestRateForYear(year) {
        return year.marginalEffectiveInterestRate;
    }

    // Primary balance * marginal eff. Int. rate
    debtChargesOnExistingDebtStockForYear(year) {
        return year.debtChargesOnExistingDebtStock;
    }




    // From fiscal model import
    mediumTermBondRateForYear(year) {
        return year.mediumTermBondRate;
    }

    // From fiscal model import
    longTermBondRateForYear(year) {
        return year.longTermBondRate;
    }





    annualPublicDebtChargeForYear(year) {

    }
}