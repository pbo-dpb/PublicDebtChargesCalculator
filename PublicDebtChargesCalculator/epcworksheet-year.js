class Year {
    constructor(label, dayRate90, yearRate10) {

        this.label = label;
        this.dayRate90 = dayRate90;
        this.yearRate10 = yearRate10;
        this.ratioOfBondsToTBills = ratioOfBondsToTBills;
        this.totalRevenueMeasures = 0;
        this.totalProgramSpendingMeasures = 0;

    }

    get netChangeOnPrimaryBalance() {
        return this.totalRevenueMeasures - this.totalProgramSpendingMeasures;
    }

    get marginalEffectiveInterestRate() {
        return this.yearRate10 * this.ratioOfBondsToTBills + this.dayRate90 * (1 - this.ratioOfBondsToTBills);
    }

    get debtChargesOnPrimaryBalances() {
        return (this.marginalEffectiveInterestRate / 100) * this.netChangeOnPrimaryBalance;
    }


    get newBorrowing() {
        return -(this.netChangeOnPrimaryBalance + this.debtChargesOnPrimaryBalances);
    }



}