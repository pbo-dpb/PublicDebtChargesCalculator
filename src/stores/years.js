import { defineStore } from 'pinia'
import collect from "collect.js";
import { Year } from "../models/year.js"


export const useFiscalYearsStore = defineStore('fiscal-years', {
    state: () => ({
        years: function () {
            let counter = 0;
            let previousYear = null;
            return collect([
                new Year('2021-2022', true),
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
                new Year('2033-2034', true),
            ]).mapWithKeys(yr => {
                yr.previousYearId = previousYear ? ("" + previousYear.label) : null;
                yr.counter = counter;
                previousYear = yr;
                counter++;
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

        year10BondRateForYear(year) {
            return this.remember(`year10BondRateForYear-${year.label}`, () => {
                return year.year10BondRate;
            })
        },


        marginalEffectiveInterestRateForYear() {
            return this.remember(`marginalEffectiveInterestRateForYear-${year.label}`, () => {
                return year.marginalEffectiveInterestRate;
            })
        },


        longTermBondRateForYear(year) {
            return this.remember(`longTermBondRateForYear-${year.label}`, () => {
                return year.longTermBondRate;
            })
        },

        // Calculated from fiscal model import
        marginalEffectiveInterestRateForYear(year) {
            return this.remember(`marginalEffectiveInterestRateForYear-${year.label}`, () => {
                return year.marginalEffectiveInterestRate;
            })
        },

        // Primary balance * marginal eff. Int. rate
        debtChargesOnPrimaryBalancesForYear(year) {
            return this.remember(`debtChargesOnPrimaryBalancesForYear-${year.label}`, () => {
                return year.debtChargesOnPrimaryBalances;
            })
        },


        // Previous debt stock * running int. rate
        debtChargesOnExistingDebtStockForYear(year) {
            return this.remember(`debtChargesOnExistingDebtStockForYear-${year.label}`, () => {
                const previousYear = year.previousYear(this);

                const runningApplicableInterestRateAllDebt = previousYear ? this.runningApplicableInterestRateAllDebtForYear(previousYear) : 0;
                const cumulativeSurplus = previousYear ? this.cumulativeSurplusForYear(previousYear) : 0;

                return (runningApplicableInterestRateAllDebt / 100) * cumulativeSurplus;
            })
        },

        // Primary balance + debt charges on primary balance + debt charges on existing debt stock
        newBorrowingForYear(year) {
            return this.remember(`newBorrowingForYear-${year.label}`, () => {
                return -(this.netChangeOnPrimaryBalanceForYear(year) + this.debtChargesOnPrimaryBalancesForYear(year) + this.debtChargesOnExistingDebtStockForYear(year));
            })
        },




        // Sum of previous new borrowings
        debtStockForYear(year) {
            return this.remember(`debtStockForYear-${year.label}`, () => {
                const previousYear = year.previousYear(this);
                const cumulativeDebtStock = previousYear ? this.debtStockForYear(previousYear) : 0;
                return cumulativeDebtStock + this.newBorrowingForYear(year);
            })
        },

        // New borrowing * share of MT bonds 
        mediumTermBondsNewborrowingForYear(year) {
            return this.remember(`mediumTermBondsNewborrowingForYear-${year.label}`, () => {
                return this.newBorrowingForYear(year) * fiscalModelStatics.assumedMarketDebtShare.mediumTermBonds;
            })
        },

        // Sum of new positive MT bond borrowings
        mediumTermBondsCumulativeBorrowingForYear(year) {
            return this.remember(`mediumTermBondsCumulativeBorrowingForYear-${year.label}`, () => {

                const previousYear = year.previousYear(this);
                const mediumTermBondsCumulativeBorrowingForPreviousYears = previousYear ? this.mediumTermBondsCumulativeBorrowingForYear(previousYear) : 0;

                const currentYearmediumTermBondsNewborrowing = this.mediumTermBondsNewborrowingForYear(year);


                return (mediumTermBondsCumulativeBorrowingForPreviousYears >= 0 ? mediumTermBondsCumulativeBorrowingForPreviousYears : 0) + (currentYearmediumTermBondsNewborrowing >= 0 ? currentYearmediumTermBondsNewborrowing : 0);
            })

        },


        // New borrowing * share of LT bonds
        longTermBondsNewborrowingForYear(year) {
            return this.remember(`longTermBondsNewborrowingForYear-${year.label}`, () => {
                return this.newBorrowingForYear(year) * fiscalModelStatics.assumedMarketDebtShare.longTermBonds;
            })
        },

        // Stock of borrowing * share of MT bonds
        mediumTermBondsStockForYear(year) {
            return this.remember(`mediumTermBondsStockForYear-${year.label}`, () => {
                return fiscalModelStatics.assumedMarketDebtShare.mediumTermBonds * this.debtStockForYear(year);
            })

        },

        // Stock of borrowing * share of LT bonds
        longTermBondsStockForYear(year) {
            return this.remember(`longTermBondsStockForYear-${year.label}`, () => {
                return fiscalModelStatics.assumedMarketDebtShare.longTermBonds * this.debtStockForYear(year);
            })
        },


        _yearBondTurnoverForYearNumYear(yearNum, year) {
            const yearsAgo = this.retrieveYearAgoFromYear(yearNum, year);
            if (!yearsAgo) {
                return false;
            }




            const mediumTermBondsCumulativeBorrowing = this.mediumTermBondsCumulativeBorrowingForYear(year);
            if (mediumTermBondsCumulativeBorrowing != 0) {


                const yearBondTurnoverForYearsAgo = this._yearBondTurnoverForYearNumYear(yearNum, yearsAgo);


                const i = (this.mediumTermBondsNewborrowingForYear(yearsAgo) / mediumTermBondsCumulativeBorrowing)
                    * this.mediumTermBondsStockForYear(year)
                    * mtDecomposition.mediumTermBondsComposition[`year${yearNum}`].share
                    + (yearBondTurnoverForYearsAgo ? yearBondTurnoverForYearsAgo : 0);

                return Math.max(0, i);
            }

            return 0;
        },

        // Turnover 2Y ago + (MT borrowed 2Y ago/cumulative MT borrowed)*current MT stock * share of 2Y bonds in MT
        year2BondTurnoverForYear(year) {
            return this.remember(`year2BondTurnoverForYear-${year.label}`, () => {
                return this._yearBondTurnoverForYearNumYear(2, year);
            })
        },

        // Turnover 3Y ago + (MT borrowed 3Y ago/cumulative MT borrowed)*current MT stock * share of 3Y bonds in MT
        year3BondTurnoverForYear(year) {

            return this.remember(`year3BondTurnoverForYear-${year.label}`, () => {
                return this._yearBondTurnoverForYearNumYear(3, year);
            })
        },

        // Turnover 5Y ago + (MT borrowed 5Y ago/cumulative MT borrowed)*current MT stock * share of 5Y bonds in MT
        year5BondTurnoverForYear(year) {

            return this.remember(`year5BondTurnoverForYear-${year.label}`, () => {
                return this._yearBondTurnoverForYearNumYear(5, year);
            })
        },

        // Sum of 2Y, 3Y, 5Y bond turnovers
        totalMediumTermBondTurnoverForYear(year) {
            return this.remember(`totalMediumTermBondTurnoverForYear-${year.label}`, () => {
                return this.year2BondTurnoverForYear(year) + this.year3BondTurnoverForYear(year) + this.year5BondTurnoverForYear(year)
            })
        },


        // From fiscal model import
        mediumTermBondRateForYear(year) {
            return this.remember(`mediumTermBondRateForYear-${year.label}`, () => {
                return year.mediumTermBondRate;
            })
        },

        // (Turnover + new issuances)/Current stock
        shareOfMediumTermBondsNewlyIssuedForYear(year) {
            return this.remember(`shareOfMediumTermBondsNewlyIssuedForYear-${year.label}`, () => {
                let i = 0;
                const sumOfturnOverAndNewIssuance = this.totalMediumTermBondTurnoverForYear(year) + this.mediumTermBondsNewborrowingForYear(year);
                const mediumTermBondsStock = this.mediumTermBondsStockForYear(year);
                if (mediumTermBondsStock > 0 && sumOfturnOverAndNewIssuance > 0) {
                    i = sumOfturnOverAndNewIssuance / mediumTermBondsStock;
                }
                return Math.min(1, i);
            })
        },



        // Share new * new rate + share old * old rate
        runningApplicableInterestRateMediumTermForYear(year) {
            return this.remember(`runningApplicableInterestRateMediumTermForYear-${year.label}`, () => {

                if (this.mediumTermBondsStockForYear(year) > 0) {
                    const previousYear = year.previousYear(this);
                    const shareOfMediumTermBondsNewlyIssued = this.shareOfMediumTermBondsNewlyIssuedForYear(year);
                    return shareOfMediumTermBondsNewlyIssued * this.mediumTermBondRateForYear(year) + (1 - shareOfMediumTermBondsNewlyIssued) * this.runningApplicableInterestRateMediumTermForYear(previousYear);
                }
                return this.mediumTermBondRateForYear(year);
            })

        },



        // From fiscal model import
        longTermBondRateForYear(year) {
            return this.remember(`longTermBondRateForYear-${year.label}`, () => {
                return year.longTermBondRate;
            })
        },


        // New issuances/Current stock
        shareOfLongTermBondsNewlyIssuedForYear(year) {

            return this.remember(`shareOfLongTermBondsNewlyIssuedForYear-${year.label}`, () => {
                let i = 0;
                const longTermBondsStock = this.longTermBondsStockForYear(year);
                const longTermBondsNewborrowing = this.longTermBondsNewborrowingForYear(year);

                if (longTermBondsStock > 0 && longTermBondsNewborrowing > 0) {
                    i = longTermBondsNewborrowing / longTermBondsStock;
                }

                return Math.min(1, i);
            })


        },

        //Share new * new rate + share old * old rate
        runningApplicableInterestRateLongTermForYear(year) {
            return this.remember(`runningApplicableInterestRateLongTermForYear-${year.label}`, () => {

                const longTermBondsStock = this.longTermBondsStockForYear(year);
                const longTermBondRate = this.longTermBondRateForYear(year);
                if (longTermBondsStock > 0) {
                    const shareOfLongTermBondsNewlyIssued = this.shareOfLongTermBondsNewlyIssuedForYear(year);
                    const previousYear = year.previousYear(this);
                    return shareOfLongTermBondsNewlyIssued * longTermBondRate + (1 - shareOfLongTermBondsNewlyIssued) * this.runningApplicableInterestRateLongTermForYear(previousYear);
                }
                return longTermBondRate;
            })

        },


        runningApplicableInterestRateAllDebtForYear(year) {
            return this.remember(`runningApplicableInterestRateAllDebtForYear-${year.label}`, () => {
                return fiscalModelStatics.assumedMarketDebtShare.tBills * this.day90TreasuryBillsRateForYear(year)
                    +
                    fiscalModelStatics.assumedMarketDebtShare.longTermBonds * this.runningApplicableInterestRateLongTermForYear(year)
                    +
                    fiscalModelStatics.assumedMarketDebtShare.mediumTermBonds * this.runningApplicableInterestRateMediumTermForYear(year);
            })

        },

        // 
        annualPublicDebtChargeForYear(year) {
            return this.remember(`annualPublicDebtChargeForYear-${year.label}`, () => {
                return this.debtChargesOnPrimaryBalancesForYear(year) + this.debtChargesOnExistingDebtStockForYear(year);
            })

        },

        //
        cumulativeSurplusForYear(year) {
            return this.remember(`cumulativeSurplusForYear-${year.label}`, () => {
                return -this.debtStockForYear(year);
            })
        },

        // 
        surplusOrDeficitForYear(year) {
            return this.remember(`surplusOrDeficitForYear-${year.label}`, () => {
                return this.annualPublicDebtChargeForYear(year) + this.netChangeOnPrimaryBalanceForYear(year);
            })
        },

        // 
        cumulativePublicDebtChargesForYear(year) {
            return this.remember(`cumulativePublicDebtChargesForYear-${year.label}`, () => {
                const previousYear = year.previousYear(this);
                const previousYearCumulativeDebtCharges = (previousYear ? this.cumulativePublicDebtChargesForYear(previousYear) : 0);
                return previousYearCumulativeDebtCharges + this.annualPublicDebtChargeForYear(year);
            })

        },




        /// Extra display
        treasuryBillStockForYear(year) {
            return this.remember(`treasuryBillStockForYear-${year.label}`, () => {
                return this.debtStockForYear(year) * fiscalModelStatics.assumedMarketDebtShare.tBills;
            })
        },

    }


})