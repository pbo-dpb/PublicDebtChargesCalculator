import { Year } from "./year.js"
/**
 * Last update. Is used to update user facing label. 
 * YYYY-MM-DD
 */
export const lastUpdated = "2022-11-23";

/**
 * Declaration of all years in table.
 * Static import from Fiscal Model.
 * Year(label, hidden, day90TreasuryBillsRate, marginalEffectiveInterestRate, mediumTermBondRate, longTermBondRate, year10BondRate)
 */
export const staticYears = [
    new Year('2022-2023', true, 3.1949999166666600, 3.1846010923961100, 3.1725341666666700, 3.1761070000000000, 0),
    new Year('2023-2024', false, 4.3250000000000000, 4.0138796732095500, 3.7693862000000000, 3.5496315000000000, 3.3989770000000000),
    new Year('2024-2025', false, 2.8250000000000000, 3.0267463972148500, 3.0874737500000000, 3.5041517500000000, 3.2624562500000000),
    new Year('2025-2026', false, 2.4500000000000000, 2.7853315649867400, 2.9300000000000000, 3.5000000000000000, 3.2500000000000000),
    new Year('2026-2027', false, 2.4500000000000000, 2.7853315649867400, 2.9300000000000000, 3.5000000000000000, 3.2500000000000000),
    new Year('2027-2028', false, 2.4500000000000000, 2.7853315649867400, 2.9300000000000000, 3.5000000000000000, 3.2500000000000000),
];


export const fiscalModelStatics = {
    assumedMarketDebtShare: {
        tBills: 0.5092838196286470,
        longTermBonds: 0.1750663129973470,
        mediumTermBonds: 0.3156498673740050
    },
}

export const mtDecomposition = {
    mediumTermBondsComposition: {
        year2: {
            share: 0.5714285714285710,
        },
        year3: {
            share: 0.1680672268907560,
        },
        year5: {
            share: 0.2605042016806720,
        }
    }
}

