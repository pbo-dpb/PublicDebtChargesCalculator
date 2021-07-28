/**
 * Last update. Is used to update user facing label. 
 * YYYY-MM-DD
 */
const lastUpdated = "2021-07-28";

/**
 * Declaration of all years in table.
 * Year(label, hidden, day90TreasuryBillRate, year10BondRate, longTermBondRate)
 */
const staticYears = [
    new Year('2019-2020', true, 1.535, 1.39, 1.59916666666666),
    new Year('2020-2021', true, 0.153374991666666, 0.734416583333333, 1.26721675),
    new Year('2021-2022', false, 0.192125, 1.39341675, 1.74863575),
    new Year('2022-2023', false, 0.23125, 1.42291675, 1.77083325),
    new Year('2023-2024', false, 0.6375, 1.72083325, 2.04166675),
    new Year('2024-2025', false, 1.1375, 2.0875, 2.375),
    new Year('2025-2026', false, 1.6375, 2.4625, 2.71875),
];