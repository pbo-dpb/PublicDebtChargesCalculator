import { useDebtProjectionStore } from "../stores/debt-projection";

let userInput;
try {
    const rawUserInput = window.localStorage.getItem("pdcc-user-input");
    userInput = rawUserInput ? JSON.parse(rawUserInput) : {};
} catch (error) {
    userInput = {}
}

export class Year {
    constructor(label, hidden) {
        const debtProjectionStore = useDebtProjectionStore();

        this.label = label;
        this.hidden = hidden;
        this.marginalTBillsRate = debtProjectionStore.averageForFiscalYear(label, "marginalTBillsRate");
        this.marginalLTBondsRate = debtProjectionStore.averageForFiscalYear(label, "marginalLTBondsRate");
        this.marginal10yrBondsRate = debtProjectionStore.averageForFiscalYear(label, "marginal10yrBondsRate");
        /*this.day90TreasuryBillsRate = day90TreasuryBillsRate;
        this.marginalEffectiveInterestRate = marginalEffectiveInterestRate;
        this.mediumTermBondRate = mediumTermBondRate;
        this.longTermBondRate = longTermBondRate;
        this.year10BondRate = year10BondRate;*/

        // User inputs
        this.totalRevenueMeasures = userInput?.[label]?.totalRevenueMeasures ?? 0;
        this.totalProgramSpendingMeasures = userInput?.[label]?.totalProgramSpendingMeasures ?? 0;

        this.previousYearId = null;

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