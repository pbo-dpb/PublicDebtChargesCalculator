import { localizedStrings } from "./strings.js"
import collect from "collect.js";

const strings = collect(localizedStrings).map((s) => s[document.documentElement.lang]).items;
const UNIT_MILLIONS = "millions"

class Output {
    constructor(id, group, unit, isStatic) {
        this.id = id;
        this.isStatic = isStatic;
        this.group = group ? strings.groups[group] : null;
        this.unit = unit ? strings.units[unit] : '';
        this.label = strings[id].label;
        this.warning = strings[id].warning;
    }
}

export const generalOutputs = [
    new Output("netChangeOnPrimaryBalance", null, UNIT_MILLIONS),
    new Output("annualPublicDebtCharge", null, UNIT_MILLIONS),
    new Output("surplusOrDeficit", null, UNIT_MILLIONS),
    new Output("cumulativeSurplus", null, UNIT_MILLIONS),
    new Output("cumulativePublicDebtCharges", null, UNIT_MILLIONS),
]

export const backendOutputs = [

    new Output("day90TreasuryBillsRate", 'interestRates', null, true),
    new Output("year10BondRate", 'interestRates', null, true),
    new Output("longTermBondRate", 'interestRates', null, true),
    new Output("longTermBondRate", 'interestRates', null, true),
    new Output("marginalEffectiveInterestRate", 'interestRates', null, true),

    new Output("debtChargesOnPrimaryBalances", 'overallNewDebt', null),
    new Output("debtChargesOnExistingDebtStock", 'overallNewDebt', null),
    new Output("newBorrowing", 'overallNewDebt', null),
    new Output("debtStock", 'overallNewDebt', null),

    new Output("treasuryBillStock", "incrementalGovernmentBondsComposition", null),
    new Output("mediumTermBondsStock", 'incrementalGovernmentBondsComposition', null),
    new Output("longTermBondsStock", 'incrementalGovernmentBondsComposition', null),

]