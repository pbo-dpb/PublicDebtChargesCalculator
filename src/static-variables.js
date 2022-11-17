import { Year } from "./year.js"
/**
 * Last update. Is used to update user facing label. 
 * YYYY-MM-DD
 */
export const lastUpdated = "2022-11-24";

/**
 * Declaration of all years in table.
 * Year(label, hidden, day90TreasuryBillRate, year10BondRate, longTermBondRate)
 */
export const staticYears = [
    /*new Year('2022-2023', false, 0.825,	        2.1525925,	    2.33317025),
    new Year('2023-2024', false, 1.78333325,	2.54370375,	    2.89737325),
    new Year('2024-2025', false, 2.2,	        3,	            3.25),
    new Year('2025-2026', false, 2.2,	        3,           	3.25),
    new Year('2026-2027', false, 2.2,	        3,	            3.25),*/
    new Year('2022-2023', true),
    new Year('2023-2024', false),

];