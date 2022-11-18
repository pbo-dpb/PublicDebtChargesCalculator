export class Year {
    constructor(label, hidden, day90TreasuryBillsRate, marginalEffectiveInterestRate, mediumTermBondRate, longTermBondRate) {

        this.label = label;
        this.hidden = hidden;
        this.day90TreasuryBillsRate = day90TreasuryBillsRate;
        this.marginalEffectiveInterestRate = marginalEffectiveInterestRate;
        this.mediumTermBondRate = mediumTermBondRate;
        this.longTermBondRate = longTermBondRate

        // Dynamic
        this.totalRevenueMeasures = 0;
        this.totalProgramSpendingMeasures = 0;
        this.previousYearId = null;


    }

    previousYear(years) {
        return years.years[this.previousYearId];
    }

    get netChangeOnPrimaryBalance() {
        return this.totalRevenueMeasures - this.totalProgramSpendingMeasures;
    }






}