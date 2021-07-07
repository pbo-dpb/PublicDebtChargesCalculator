class FiscalYears {
    constructor() {
        this.years = staticYears;
    }

    /**
     * Array of user visible years.
     * @returb {array}
     */
    get displayYears() {
        return collect(this.years).reject(year => year.hidden).items;
    }

    /**
     * Return an ordered list of years up to the provided year, including it as
     * the last item.
     * @param {Year} limitYear
     * @returns {collection} 
     */
    inclusiveYearsUntilCollection(limitYear) {
        let limitYearIndex;
        return collect(this.years).map((year, index) => {
            return {
                year: year,
                index: index
            }
        }).pipe((collection) => {
            limitYearIndex = collection.first((year) => {
                return year.year.label === limitYear.label
            }).index;
            return collection;
        }).filter((year) => {
            return year.index <= limitYearIndex;
        }).map((year) => {
            return year.year;
        })
    }

    /**
     * Return an ordered list of years up to the provided year, excluding it.
     * @param {Year} limitYear 
     * @returns {collection}
     */
    exclusiveYearsUntilCollection(limitYear) {
        return this.inclusiveYearsUntilCollection(limitYear).slice(0, -1);
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
        return Math.min(1,
            ((incrementalMediumTermBondStock > 0)
                ?
                1 - Math.pow((1 - 0.08), 4) + (incrementalMediumTermBondStock - previousYearincrementalMediumTermBondStock) / incrementalMediumTermBondStock
                :
                0)
        );
    }

    totalDebtChargesForYear(year) {
        return 0;
    }



}