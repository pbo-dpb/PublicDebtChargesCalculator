export class Year {
    constructor(label, hidden, day90TreasuryBillsRate, marginalEffectiveInterestRate, mediumTermBondRate, longTermBondRate) {

        this.label = label;
        this.hidden = hidden;
        this.day90TreasuryBillsRate = day90TreasuryBillsRate;
        this.marginalEffectiveInterestRate = marginalEffectiveInterestRate;
        this.mediumTermBondRate = mediumTermBondRate;
        this.longTermBondRate = longTermBondRate

        // User inputs
        this.totalRevenueMeasures = 0;
        this.totalProgramSpendingMeasures = 0;

        /// ### DEBUG
        if (label == "2023-2024") {
            this.totalRevenueMeasures = 123;
            this.totalProgramSpendingMeasures = 456;
        }
        /// ### /DEBUG

        // Set via years.js
        this.previousYearId = null;

    }

    previousYear(years) {
        return years.years[this.previousYearId];
    }




    /**
     * Dynamic variables
     */

    get netChangeOnPrimaryBalance() {
        return this.totalRevenueMeasures - this.totalProgramSpendingMeasures;
    }



    get debtChargesOnExistingDebtStock() {
        return (this.marginalEffectiveInterestRate / 100) * this.netChangeOnPrimaryBalance;
    }



}