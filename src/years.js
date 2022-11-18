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
    debtChargesOnPrimaryBalancesForYear(year) {
        return year.debtChargesOnPrimaryBalances;
    }


    // Previous debt stock * running int. rate
    debtChargesOnExistingDebtStockForYear(year) {

        const previousYear = year.previousYear(this);
        const runningApplicableInterestRateAllDebt = previousYear ? this.runningApplicableInterestRateAllDebtForYear(previousYear) : 0;
        const cumulativeSurplus = previousYear ? this.cumulativeSurplusForYear(year) : 0;

        return (runningApplicableInterestRateAllDebt / 100) * cumulativeSurplus;
    }

    // Primary balance + debt charges on primary balance + debt charges on existing debt stock
    newBorrowingForYear(year) {
        return -(this.netChangeOnPrimaryBalanceForYear(year) + this.debtChargesOnPrimaryBalancesForYear(year) + this.debtChargesOnExistingDebtStockForYear(year));
    }




    // From fiscal model import
    mediumTermBondRateForYear(year) {
        return year.mediumTermBondRate;
    }



    // Turnover 2Y ago + (MT borrowed 2Y ago/cumulative MT borrowed)*current MT stock * share of 2Y bonds in MT
    year2BondTurnoverForYear(year) {

        if (year.rawFirstYear - Object.values(this.years)[0].rawFirstYear < 2) {
            return false;
        }

        //TODO Implement
        return 0;
    }

    // Turnover 3Y ago + (MT borrowed 3Y ago/cumulative MT borrowed)*current MT stock * share of 3Y bonds in MT
    year3BondTurnoverForYear(year) {

        if (year.rawFirstYear - Object.values(this.years)[0].rawFirstYear < 3) {
            return false;
        }

        //TODO Implement
        return 0;
    }

    // Turnover 5Y ago + (MT borrowed 5Y ago/cumulative MT borrowed)*current MT stock * share of 5Y bonds in MT
    year5BondTurnoverForYear(year) {

        if (year.rawFirstYear - Object.values(this.years)[0].rawFirstYear < 5) {
            return false;
        }

        //TODO Implement
        return 0;
    }

    // Sum of 2Y, 3Y, 5Y bond turnovers
    totalMediumTermBondTurnoverForYear(year) {
        return this.year2BondTurnoverForYear(year) + this.year3BondTurnoverForYear(year) + this.year5BondTurnoverForYear(year)
    }




    // From fiscal model import
    longTermBondRateForYear(year) {
        return year.longTermBondRate;
    }



    runningApplicableInterestRateAllDebtForYear(year) {
        //TODO Implement
        return 0;
    }

    annualPublicDebtChargeForYear(year) {
        //TODO Implement
        return 0;
    }

    cumulativeSurplusForYear(year) {
        //TODO Implement
        return 0;
    }
}