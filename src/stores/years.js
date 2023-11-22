import { defineStore } from 'pinia'
import collect from "collect.js";
import { Year } from "../models/year.js"


export const useFiscalYearsStore = defineStore('fiscal-years', {
    state: () => ({
        years: function () {
            return collect([
                new Year('2021-2022', true, "first"),
                new Year('2022-2023', true),
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
                new Year('2033-2034', true, "last"),
            ]).mapWithKeys(yr => {
                return [yr.label, yr];
            }).all();
        }(),
        rememberMatrix: {}
    }),

    getters: {
        /**
     * Array of user visible years.
     * @returb {array}
     */
        displayYears: (state) => {
            return collect(state.years).reject(year => year.hidden).items;
        }
    },

    actions: {

        /**
         * Temporarely cache function results to avoid exceeding call stack size
         * @param {string} key A key for a given value
         * @param {function} callback A function to execute if the key is not cached
         */
        remember(key, callback) {
            if (this.rememberMatrix[key]) return this.rememberMatrix[key];
            const rememberValue = callback();
            this.rememberMatrix[key] = rememberValue;
            return rememberValue;
        },

        /**
         * Clear the cache. Used to regenerate the caching matrix after user input.
         */
        forget() {
            this.rememberMatrix = {};
        },

        retrieveYearAgoFromYear(yearsAgo, currentYear) {

            let luckyYear = null;
            let previousYear = currentYear.previousYear(this);
            const currentYearBegins = currentYear.rawFirstYear;

            while (previousYear && !luckyYear) {
                luckyYear = (currentYearBegins - previousYear.rawFirstYear) == yearsAgo ? previousYear : null;
                if (!luckyYear)
                    previousYear = previousYear.previousYear(this);
            }

            return luckyYear;
        },


        /**
        *  Dynamic getters called by UI render
        */
        netChangeOnPrimaryBalanceForYear(year) {
            return this.remember(`netChangeOnPrimaryBalanceForYear-${year.label}`, () => {
                return year.netChangeOnPrimaryBalance;
            })
        },

        // Imported from econ outlook
        day90TreasuryBillsRateForYear(year) {
            return this.remember(`day90TreasuryBillsRateForYear-${year.label}`, () => {
                return year.day90TreasuryBillsRate;
            })
        },

        longTermBondRateNewBorrowingForYear(year) {
            return this.remember(`longTermBondRateNewBorrowingForYear-${year.label}`, () => {
                return year.longTermBondRateNewBorrowing;
            })
        },

        mediumTermBondRateNewBorrowingForYear(year) {
            return this.remember(`mediumTermBondRateNewBorrowingForYear-${year.label}`, () => {
                return year.mediumTermBondRateNewBorrowing;
            })
        },



    }


})