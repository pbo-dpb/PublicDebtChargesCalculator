export class Year {
    constructor(label, hidden) {

        this.label = label;
        this.hidden = hidden;



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