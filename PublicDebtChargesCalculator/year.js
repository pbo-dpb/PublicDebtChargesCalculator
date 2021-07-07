class Year {
    constructor(label, hidden, day90TreasuryBillRate, year10BondRate, longTermBondRate) {

        this.label = label;
        this.hidden = hidden;
        this.day90TreasuryBillRate = day90TreasuryBillRate;
        this.year10BondRate = year10BondRate;
        this.longTermBondRate = longTermBondRate;

        this.totalRevenueMeasures = 0;
        this.totalProgramSpendingMeasures = 0;


        // DEBUG - TODO REMOVE
        switch (label) {
            case '2019-2020':
                this.totalProgramSpendingMeasures = 100;
                break;
            case '2023-2024':
                this.totalProgramSpendingMeasures = 500;
                break;
            case '2025-2026':
            case '2026-2027':
                this.totalProgramSpendingMeasures = 300;
                break;
        }
        // ENDDEBUG
    }

    get netChangeOnPrimaryBalance() {
        return this.totalRevenueMeasures - this.totalProgramSpendingMeasures;
    }
    /*
        get marginalEffectiveInterestRate() {
            return this.yearRate10 * this.ratioOfBondsToTBills + this.dayRate90 * (1 - this.ratioOfBondsToTBills);
        }
    
        get debtChargesOnPrimaryBalances() {
            return (this.marginalEffectiveInterestRate / 100) * this.netChangeOnPrimaryBalance;
        }
    
    
        get newBorrowing() {
            return -(this.netChangeOnPrimaryBalance + this.debtChargesOnPrimaryBalances);
        }
    */


    get effectiveInterestRateOnNewMediumTermDebt() {
        // This 60:40 blend reflects average PDC's on medium-term bonds historicly
        return 0.6 * this.year10BondRate + 0.4 * this.day90TreasuryBillRate;
    }



}