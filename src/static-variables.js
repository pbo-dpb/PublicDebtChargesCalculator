import { Year } from "./year.js"
/**
 * Last update. Is used to update user facing label. 
 * YYYY-MM-DD
 */
export const lastUpdated = "2022-11-24";

/**
 * Declaration of all years in table.
 * Static import from Fiscal Model.
 * Year(label, hidden, day90TreasuryBillsRate, marginalEffectiveInterestRate, mediumTermBondRate, longTermBondRate)
 */
export const staticYears = [
    new Year('2022-2023', true, 3.1949999167, 3.1846010924, 3.1725341667, 3.1761070000),
    new Year('2023-2024', false, 3.7625000000, 3.6460659603, 3.5193864500, 3.5357557500),
    new Year('2024-2025', false, 2.7625000000, 2.9866409830, 3.0615439000, 3.5036352500),
    new Year('2025-2026', false, 2.4500000000, 2.7853315650, 2.9300000000, 3.5000000000),
    new Year('2026-2027', false, 2.4500000000, 2.7853315650, 2.9300000000, 3.5000000000),
    new Year('2027-2028', false, 2.4500000000, 2.7853315650, 2.9300000000, 3.5000000000),

];