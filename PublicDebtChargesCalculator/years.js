class FiscalYears {
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




    /*
      _____  _____   _____ _____       _____ ______ _____  _____  
     |  __ \|  __ \ / ____/ ____|     / ____|  ____|  __ \|  __ \ 
     | |__) | |  | | |   | |   ______| |    | |__  | |  | | |__) |
     |  ___/| |  | | |   | |  |______| |    |  __| | |  | |  ___/ 
     | |    | |__| | |___| |____     | |____| |    | |__| | |     
     |_|    |_____/ \_____\_____|     \_____|_|    |_____/|_|     
                                                                  
    */

    /**
     * New borrowing is primary balance + public debt charges on existing debt + public debt charages on new debt
     */
    newIncrementalBorrowingForYear(year) {
        const previousYear = year.previousYear(this);
        return -year.netChangeOnPrimaryBalance - (previousYear ? this.totalDebtChargesForYear(previousYear) : 0) - year.debtChargesOnPrimaryBalance
    }

    /**
     * The sum of all prior new borrowing
     */
    cumulativeIncrementalBorrowingForYear(year) {
        const previousYear = year.previousYear(this);
        return (previousYear ? this.cumulativeIncrementalBorrowingForYear(previousYear) : 0) + this.newIncrementalBorrowingForYear(year);
    }

    /**
     * An approximation towards 40% of bonds, the share observed historicly
     */
    incrementalLongTermBondStockForYear(year) {
        const previousYear = year.previousYear(this);
        const previousYearIncrementalLongTermBondStock = previousYear ? this.incrementalLongTermBondStockForYear(previousYear) : 0;
        const previousYearCumulativeIncrementalBorrowing = previousYear ? this.cumulativeIncrementalBorrowingForYear(previousYear) : 0;
        const newIncrementalBorrowing = this.newIncrementalBorrowingForYear(year);

        return (((previousYearIncrementalLongTermBondStock * 0.9 + (previousYearCumulativeIncrementalBorrowing + newIncrementalBorrowing * 1 / 4) * 0.4 * 0.1) * 0.9 + (previousYearCumulativeIncrementalBorrowing + newIncrementalBorrowing * 2 / 4) * 0.4 * 0.1) * 0.9 + (previousYearCumulativeIncrementalBorrowing + newIncrementalBorrowing * 3 / 4) * 0.4 * 0.1) * 0.9 + (previousYearCumulativeIncrementalBorrowing + newIncrementalBorrowing * 4 / 4) * 0.4 * 0.1;
    }

    /**
     * Calculated as residual bond stock
     */
    incrementalMediumTermBondStockForYear(year) {
        return this.cumulativeIncrementalBorrowingForYear(year) - this.incrementalLongTermBondStockForYear(year);
    }

    /**
     * (Turnover + New issuances)/Prior Stock
     */
    shareOfMediumTermBondsNewlyIssuedForYear(year) {
        const previousYear = year.previousYear(this);
        const previousYearincrementalMediumTermBondStock = previousYear ? this.incrementalMediumTermBondStockForYear(previousYear) : 0;
        const incrementalMediumTermBondStock = this.incrementalMediumTermBondStockForYear(year);
        return Math.min(1, ((incrementalMediumTermBondStock > 0) ? 1 - Math.pow((1 - 0.08), 4) + (incrementalMediumTermBondStock - previousYearincrementalMediumTermBondStock) / incrementalMediumTermBondStock : 0)
        );
    }

    /**
     * (Turnover + New issuances)/Prior Stock
     */
    shareOfLongTermBondsNewlyIssuedForYear(year) {
        const previousYear = year.previousYear(this);
        const previousYearincrementalLongTermBondStock = previousYear ? this.incrementalLongTermBondStockForYear(previousYear) : 0;
        const incrementalLongTermBondStock = this.incrementalLongTermBondStockForYear(year);

        return Math.min(1, (incrementalLongTermBondStock > 0 ? 1 - Math.pow((1 - 0.015), 4) + (incrementalLongTermBondStock - previousYearincrementalLongTermBondStock) / incrementalLongTermBondStock : 0))
    }


    shareOfBondsWhichAreLongTermForYear(year) {
        const incrementalLongTermBondStock = this.incrementalLongTermBondStockForYear(year);
        return incrementalLongTermBondStock > 0 ? (incrementalLongTermBondStock / this.cumulativeIncrementalBorrowingForYear(year)) : 0;
    }

    /**
     * Share new * new rate + share old * old rate
     */
    runningApplicableInterestRateLongTermForYear(year) {
        const previousYear = year.previousYear(this);
        const previousYearRunningApplicableInterestRateLongTerm = previousYear ? this.runningApplicableInterestRateLongTermForYear(previousYear) : 0;
        const shareOfLongTermBondsNewlyIssued = this.shareOfLongTermBondsNewlyIssuedForYear(year);

        return this.cumulativeIncrementalBorrowingForYear(year) > 0 ?
            shareOfLongTermBondsNewlyIssued * year.longTermBondRate + (1 - shareOfLongTermBondsNewlyIssued) * previousYearRunningApplicableInterestRateLongTerm :
            year.longTermBondRate;
    }

    /**
     * Share new * new rate + share old * old rate
     */
    runningApplicableInterestRateMediumTermForYear(year) {
        const previousYear = year.previousYear(this);
        const previousYearRunningApplicableInterestRateMediumTermForYear = previousYear ? this.runningApplicableInterestRateMediumTermForYear(previousYear) : 0;
        const shareOfMediumTermBondsNewlyIssued = this.shareOfMediumTermBondsNewlyIssuedForYear(year);

        return this.cumulativeIncrementalBorrowingForYear(year) > 0 ?
            shareOfMediumTermBondsNewlyIssued * year.effectiveInterestRateOnNewMediumTermDebt + (1 - shareOfMediumTermBondsNewlyIssued) * previousYearRunningApplicableInterestRateMediumTermForYear :
            year.effectiveInterestRateOnNewMediumTermDebt;
    }



    totalDebtChargesForYear(year) {
        const previousYear = year.previousYear(this);
        const previousYearincrementalMediumTermBondStock = previousYear ? this.incrementalMediumTermBondStockForYear(previousYear) : 0; // F20
        const previousYearRunningApplicableInterestRateMediumTerm = previousYear ? this.runningApplicableInterestRateMediumTermForYear(previousYear) : 0; //F27
        const previousYearIncrementalLongTermBondStock = previousYear ? this.incrementalLongTermBondStockForYear(previousYear) : 0; //F19
        const previousYearRunningApplicableInterestRateLongTerm = previousYear ? this.runningApplicableInterestRateLongTermForYear(previousYear) : 0; //F26

        return -previousYearincrementalMediumTermBondStock * (previousYearRunningApplicableInterestRateMediumTerm / 100) - previousYearIncrementalLongTermBondStock * (previousYearRunningApplicableInterestRateLongTerm / 100) + year.debtChargesOnPrimaryBalance;
    }

    cumulativeSurplusForYear(year) {
        return -this.cumulativeIncrementalBorrowingForYear(year) + this.totalDebtChargesForYear(year);
    }

    cumulativePublicDebtChargesForYear(year) {
        const previousYear = year.previousYear(this);
        const previousYearTotalDebtCharges = previousYear ? this.totalDebtChargesForYear(previousYear) : 0;
        return previousYearTotalDebtCharges + this.totalDebtChargesForYear(year);
    }

}