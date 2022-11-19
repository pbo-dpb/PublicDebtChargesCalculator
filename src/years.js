import collect from "collect.js";
import { staticYears, fiscalModelStatics } from './static-variables'

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




    // Sum of previous new borrowings
    debtStockForYear(year) {
        const previousYear = year.previousYear(this);
        const cumulativeDebtStock = previousYear ? this.debtStockForYear(previousYear) : 0;
        return cumulativeDebtStock + this.newBorrowingForYear(year);
    }

    // New borrowing * share of MT bonds 
    mediumTermBondsNewborrowingForYear(year) {
        return this.newBorrowingForYear(year) * fiscalModelStatics.assumedMarketDebtShared.mediumTermBonds;
    }

    // Sum of new positive MT bond borrowings
    mediumTermBondsCumulativeBorrowingForYear(year) {
        const previousYear = year.previousYear(this);
        const previousYearMediumTermBondsNewborrowing = previousYear ? this.mediumTermBondsNewborrowingForYear(previousYear) : 0;
        const currentYearmediumTermBondsNewborrowing = this.mediumTermBondsNewborrowingForYear(year);
        return (previousYearMediumTermBondsNewborrowing >= 0 ? previousYearMediumTermBondsNewborrowing : 0) + (currentYearmediumTermBondsNewborrowing >= 0 ? currentYearmediumTermBondsNewborrowing : 0);
    }


    // New borrowing * share of LT bonds
    longTermBondsNewborrowingForYear(year) {
        return this.newBorrowingForYear(year) * fiscalModelStatics.assumedMarketDebtShared.longTermBonds;
    }

    // Stock of borrowing * share of MT bonds
    mediumTermBondsStockForYear(year) {
        return fiscalModelStatics.assumedMarketDebtShared.mediumTermBonds * this.debtStockForYear(year);
    }

    // Stock of borrowing * share of LT bonds
    longTermBondsStockForYear(year) {
        return fiscalModelStatics.assumedMarketDebtShared.longTermBonds * this.debtStockForYear(year);
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
    mediumTermBondRateForYear(year) {
        return year.mediumTermBondRate;
    }

    // (Turnover + new issuances)/Current stock
    shareOfMediumTermBondsNewlyIssuedForYear(year) {
        let i = 0;
        const sumOfturnOverAndNewIssuance = this.totalMediumTermBondTurnoverForYear(year) + this.mediumTermBondsNewborrowingForYear(year);
        const mediumTermBondsStock = this.mediumTermBondsStockForYear(year);
        if (mediumTermBondsStock > 0 && sumOfturnOverAndNewIssuance > 0) {
            i = sumOfturnOverAndNewIssuance / mediumTermBondsStock;
        }
        return Math.min(1, i);
    }



    // Share new * new rate + share old * old rate
    runningApplicableInterestRateMediumTermForYear(year) {
        if (this.mediumTermBondsStockForYear(year) > 0) {
            const previousYear = year.previousYear(this);
            const shareOfMediumTermBondsNewlyIssued = this.shareOfMediumTermBondsNewlyIssuedForYear(year);
            return shareOfMediumTermBondsNewlyIssued * this.mediumTermBondRateForYear(year) + (1 - shareOfMediumTermBondsNewlyIssued) * this.runningApplicableInterestRateAllDebtForYear(previousYear);
        }
        return this.mediumTermBondRateForYear(year);
    }



    // From fiscal model import
    longTermBondRateForYear(year) {
        return year.longTermBondRate;
    }


    // New issuances/Current stock
    shareOfLongTermBondsNewlyIssuedForYear(year) {

        let i = 0;
        const longTermBondsStock = this.longTermBondsStockForYear(year);
        const longTermBondsNewborrowing = this.longTermBondsNewborrowingForYear(year);

        if (longTermBondsStock > 0 && longTermBondsNewborrowing > 0) {
            i = longTermBondsNewborrowing / longTermBondsStock;
        }

        return Math.min(1, i);
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