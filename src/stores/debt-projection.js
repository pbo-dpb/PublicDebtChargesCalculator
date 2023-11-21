import { defineStore } from 'pinia'

const rawVals = [
    {
        "qt": "2021-04-01",
        "marginalLTBondsRate": 1.983333333,
        "marginal10yrBondsRate": 1.456666667,
        "marginalTBillsRate": 0.116666667
    },
    {
        "qt": "2021-07-01",
        "marginalLTBondsRate": 1.843333333,
        "marginal10yrBondsRate": 1.31,
        "marginalTBillsRate": 0.17
    },
    {
        "qt": "2021-10-01",
        "marginalLTBondsRate": 1.916666667,
        "marginal10yrBondsRate": 1.613333333,
        "marginalTBillsRate": 0.15
    },
    {
        "qt": "2022-01-01",
        "marginalLTBondsRate": 2.236666667,
        "marginal10yrBondsRate": 2.08,
        "marginalTBillsRate": 0.636666667
    },
    {
        "qt": "2022-04-01",
        "marginalLTBondsRate": 2.92,
        "marginal10yrBondsRate": 2.95,
        "marginalTBillsRate": 1.656666667
    },
    {
        "qt": "2022-07-01",
        "marginalLTBondsRate": 2.94,
        "marginal10yrBondsRate": 2.986666667,
        "marginalTBillsRate": 3.223333333
    },
    {
        "qt": "2022-10-01",
        "marginalLTBondsRate": 3.236666667,
        "marginal10yrBondsRate": 3.176666667,
        "marginalTBillsRate": 4.2
    },
    {
        "qt": "2023-01-01",
        "marginalLTBondsRate": 3.083333333,
        "marginal10yrBondsRate": 3.03,
        "marginalTBillsRate": 4.476666667
    },
    {
        "qt": "2023-04-01",
        "marginalLTBondsRate": 3.073333333,
        "marginal10yrBondsRate": 3.083333333,
        "marginalTBillsRate": 4.646666667
    },
    {
        "qt": "2023-07-01",
        "marginalLTBondsRate": 3.523333,
        "marginal10yrBondsRate": 3.703333,
        "marginalTBillsRate": 5.113333
    },
    {
        "qt": "2023-10-01",
        "marginalLTBondsRate": 3.582565,
        "marginal10yrBondsRate": 3.731353,
        "marginalTBillsRate": 4.95
    },
    {
        "qt": "2024-01-01",
        "marginalLTBondsRate": 3.561967,
        "marginal10yrBondsRate": 3.552743,
        "marginalTBillsRate": 4.95
    },
    {
        "qt": "2024-04-01",
        "marginalLTBondsRate": 3.541373,
        "marginal10yrBondsRate": 3.37417,
        "marginalTBillsRate": 4.45
    },
    {
        "qt": "2024-07-01",
        "marginalLTBondsRate": 3.524862,
        "marginal10yrBondsRate": 3.324604,
        "marginalTBillsRate": 3.95
    },
    {
        "qt": "2024-10-01",
        "marginalLTBondsRate": 3.51245,
        "marginal10yrBondsRate": 3.287355,
        "marginalTBillsRate": 3.45
    },
    {
        "qt": "2025-01-01",
        "marginalLTBondsRate": 3.504157,
        "marginal10yrBondsRate": 3.26247,
        "marginalTBillsRate": 2.95
    },
    {
        "qt": "2025-04-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2025-07-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2025-10-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2026-01-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2026-04-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2026-07-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2026-10-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2027-01-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2027-04-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2027-07-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2027-10-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2028-01-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2028-04-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2028-07-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2028-10-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2029-01-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2029-04-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2029-07-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2029-10-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2030-01-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2030-04-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2030-07-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2030-10-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2031-01-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2031-04-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2031-07-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    },
    {
        "qt": "2031-10-01",
        "marginalLTBondsRate": 3.5,
        "marginal10yrBondsRate": 3.25,
        "marginalTBillsRate": 2.45
    }
];


export const useDebtProjectionStore = defineStore('debt-projection', {
    state: () => ({
        vals: rawVals.map((qt) => {
            // Transform date to timestamp for easier comparison
            let qtStart = qt.qt.split("-");
            return {
                qt: (new Date(qtStart[2], qtStart[1] - 1, qtStart[0])).getTime(),
                marginalLTBondsRate: qt.marginalLTBondsRate,
                marginal10yrBondsRate: qt.marginal10yrBondsRate,
                marginalTBillsRate: qt.marginalTBillsRate
            }
        })
    }),
})