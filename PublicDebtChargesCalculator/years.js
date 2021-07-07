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
    
        surplusForTheYear(year) {
            return this.totalDebtCharges(year) + year.netChangeOnPrimaryBalance;
        }
    
        averageEffectiveInterestRate(year) {
            return this.totalDebtCharges(year) / this.cumulativeSurplus(year) * 100;
        }
    
        stockOfBorrowing(year) {
            let previousYear = this.exclusiveYearsUntilCollection(year).last();
            if (!previousYear) return year.newBorrowing;
    
            return (1 + year.marginalEffectiveInterestRate / 100) * this.stockOfBorrowing(previousYear) + year.newBorrowing;
        }
    
        totalDebtCharges(year) {
    
            let previousYear = this.exclusiveYearsUntilCollection(year).last();
            if (!previousYear) return year.debtChargesOnPrimaryBalances;
    
            return year.debtChargesOnPrimaryBalances + (year.marginalEffectiveInterestRate / 100) * this.cumulativeSurplus(previousYear);
        }
    
        cumulativeSurplus(year) {
            return -this.stockOfBorrowing(year);
        }
    
    */

}