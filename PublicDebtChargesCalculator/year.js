class Year {
    constructor(label, hidden, day90TreasuryBillRate, year10BondRate, longTermBondRate) {

        this.label = label;
        this.hidden = hidden;
        this.day90TreasuryBillRate = day90TreasuryBillRate;
        this.year10BondRate = year10BondRate;
        this.longTermBondRate = longTermBondRate;

        this.totalRevenueMeasures = 0;
        this.totalProgramSpendingMeasures = 0;
        this.previousYearId = null;


        // DEBUG - TODO REMOVE
        switch (label) {
            case '2021-2022':
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

    previousYear(years) {
        return years.years[this.previousYearId];
    }

    get netChangeOnPrimaryBalance() {
        return this.totalRevenueMeasures - this.totalProgramSpendingMeasures;
    }

    /**
     * This 60:40 blend reflects average PDC's on medium-term bonds historicly
     */
    get effectiveInterestRateOnNewMediumTermDebt() {
        return 0.6 * this.year10BondRate + 0.4 * this.day90TreasuryBillRate;
    }

    /**
     * Within a year, new debt will be held as treasury bills, for an average of two quarters.
     */
    get debtChargesOnPrimaryBalance() {
        return (Math.pow(Math.pow(this.day90TreasuryBillRate, (1 / 4)), 2) / 100) * this.netChangeOnPrimaryBalance;
    }





}