class FiscalYears {
    constructor() {
        this.years = staticYears;
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
    _____  ____   ____    ______ _____   _____ 
    |  __ \|  _ \ / __ \  |  ____|  __ \ / ____|
    | |__) | |_) | |  | | | |__  | |__) | |     
    |  ___/|  _ <| |  | | |  __| |  ___/| |     
    | |    | |_) | |__| | | |____| |    | |____ 
    |_|    |____/ \____/  |______|_|     \_____|
                                                
    */

    debtChargesOnCumulativePrimaryBalances(year) {
        return this.inclusiveYearsUntilCollection(year).reduce((carry, item) => {
            return carry + item.debtChargesOnPrimaryBalances;
        }, 0);
    }

    debtChargesOnDebtCharges(year) {

        let previousYear = this.exclusiveYearsUntilCollection(year).last();
        if (!previousYear) return 0;

        return this.debtChargesOnCumulativePrimaryBalances(previousYear) * (year.marginalEffectiveInterestRate / 100);
    }

    totalDebtCharges(year) {
        return this.debtChargesOnCumulativePrimaryBalances(year) + this.debtChargesOnDebtCharges(year);
    }

    cumulativeSurplus(year) {
        return this.inclusiveYearsUntilCollection(year).reduce((carry, item) => {
            return carry + item.netChangeOnPrimaryBalance;
        }, 0) + this.totalDebtCharges(year);
    }

    surplusForTheYear(year) {
        return this.totalDebtCharges(year) + year.netChangeOnPrimaryBalance;
    }

    averageEffectiveInterestRate(year) {
        return this.totalDebtCharges(year) / this.cumulativeSurplus(year) * 100;
    }

}