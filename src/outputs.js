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
    //new Output("annualPublicDebtCharge", null, UNIT_MILLIONS),
]

export const backendOutputs = [
    new Output("day90TreasuryBillsRate", 'overallNewDebt', null, true),
    new Output("marginalEffectiveInterestRate", 'overallNewDebt', null, true),
    new Output("mediumTermBondRate", 'mediumTermBondsTurnoverAndNewIssuances', null, true),
    new Output("longTermBondRate", 'longTermBondsNewIssuances', null, true)
]