import { defineStore } from 'pinia'

const rawVals = [
    {
        "FY": "2021-2022",
        "Treasury bills": 187,
        "2-year": 67,
        "3-year": 29,
        "5-year": 44,
        "10-year": 79,
        "30-year": 28,
        "Green bonds": 5,
        "Total bonds": 258,
        "Total gross issuance": 444
    },
    {
        "FY": "2022-2023",
        "Treasury bills": 202,
        "2-year": 67,
        "3-year": 20,
        "5-year": 31,
        "10-year": 52,
        "30-year": 14,
        "Green bonds": 0,
        "Total bonds": 185,
        "Total gross issuance": 387
    },
    {
        "FY": "2023-2024",
        "Treasury bills": 242,
        "2-year": 76,
        "3-year": 6,
        "5-year": 40,
        "10-year": 40,
        "30-year": 10,
        "Green bonds": 0,
        "Total bonds": 172,
        "Total gross issuance": 414
    }
]


export const useActualEstimatedPlannedStore = defineStore('actual-estimated-planned', {
    state: () => ({
        vals: rawVals.map((qt) => {
            return {
                ...qt,
                'unnamedDecompositionLine32': qt['10-year'] / (qt['10-year'] + qt['30-year']),
            }
        })
    })
})