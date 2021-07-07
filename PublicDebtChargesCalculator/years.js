class FiscalYears {
    constructor() {
        this.years = staticYears;
    }

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





}