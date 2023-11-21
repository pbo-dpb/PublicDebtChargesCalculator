import { Year } from "./models/year.js"
/**
 * Last update. Is used to update user facing label. 
 * YYYY-MM-DD
 */
export const lastUpdated = "2024-12-01";

/**
 * Declaration of all years in table.
 * Static import from Fiscal Model.
 * Year(label, hidden)
 */
export const staticYears = [
    new Year('2021-2022', true),
    new Year('2023-2024', true),
    new Year('2024-2025', false),
    new Year('2025-2026', false),
    new Year('2026-2027', false),
    new Year('2027-2028', false),
    new Year('2028-2029', false),
    new Year('2029-2030', true),
    new Year('2030-2031', true),
    new Year('2031-2032', true),
    new Year('2032-2033', true),
    new Year('2033-2034', true),
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


