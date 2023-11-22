import { useDebtProjectionStore } from "../stores/debt-projection";

let userInput;
try {
    const rawUserInput = window.localStorage.getItem("pdcc-user-input");
    userInput = rawUserInput ? JSON.parse(rawUserInput) : {};
} catch (error) {
    userInput = {}
}

export class Year {
    constructor(label, hidden, stopgap) {
        const debtProjectionStore = useDebtProjectionStore();

        this.label = label;
        this.hidden = hidden;

        /**
         * Set up chain of references
         */
        let fyFirstYear = parseInt(label.split("-")[0]);
        let fySecondYear = fyFirstYear + 1;

        const nextFyLabel = fySecondYear + "-" + (fySecondYear + 1).toString();
        const previousFyLabel = (fyFirstYear - 1) + "-" + fyFirstYear.toString();
        this.previousYearId = stopgap === 'first' ? null : previousFyLabel;
        this.nextYearId = stopgap === 'last' ? null : nextFyLabel;



        /** 
         * Set up fiscal model imports
         */
        /* Not displayed to end user */
        this.marginalTBillsRate = debtProjectionStore.averageForFiscalYear(label, "marginalTBillsRate");
        this.marginalLTBondsRate = debtProjectionStore.averageForFiscalYear(label, "marginalLTBondsRate");
        this.marginal10yrBondsRate = debtProjectionStore.averageForFiscalYear(label, "marginal10yrBondsRate");
        /* Displayed to end user */
        this.day90TreasuryBillsRate = debtProjectionStore.averageForFiscalYear(nextFyLabel, "marginalTBillsRate");
        this.longTermBondRateNewBorrowing = debtProjectionStore.averageForFiscalYear(nextFyLabel, "marginalLTBondsRate");

        this.mediumTermBondRateNewBorrowing = 0.6 * debtProjectionStore.averageForFiscalYear(nextFyLabel, "marginal10yrBondsRate") + 0.4 * this.day90TreasuryBillsRate;


        // User inputs
        this.totalRevenueMeasures = this.hidden ? 0 : userInput?.[label]?.totalRevenueMeasures ?? 0;
        this.totalProgramSpendingMeasures = this.hidden ? 0 : userInput?.[label]?.totalProgramSpendingMeasures ?? 0;

    }


    get rawFirstYear() {
        return this.label.split("-")[0];
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



    get debtChargesOnPrimaryBalances() {
        return (this.marginalEffectiveInterestRate / 100) * this.netChangeOnPrimaryBalance;
    }


}