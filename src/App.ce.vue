<template>

<main id="app" v-cloak>

        
        <header class="is-print-only has-text-centered" style="width: 100%">
            <h3 class="title is-3">{{ strings.title }}</h3>
            <h5 class="title is-5">{{ strings.pbo }}</h5>
        </header>

        <section v-if="selectedLanguage && years" class="section">

            <main class="container is-fluid">

                <div class="content has-text-centered is-hidden-print">
                    <h1>{{ strings.title }}</h1>
                    <p>{{ strings.description }}</p>
                    <p><small>{{ strings.updatedOn }} {{ lastUpdated }}</small></p>
                    <p>{{ strings.linkToBlogPostLabel }}<br><a :href="strings.linkToBlogPostUrl">{{
                            strings.linkToBlogPostUrl }}</a></p>
                </div>
                <!-- Main container -->
                <nav style="margin: 2em 0.5em;" class="level is-hidden-print">
                    <!-- Left side -->
                    <div class="level-left">
                        <div class="level-item">
                            <label class="checkbox">
                                <input type="checkbox" v-model="showBackEnd">
                                {{ strings.showBackEnd }}
                            </label>
                        </div>

                    </div>

                    <!-- Right side -->
                    <div class="level-right" v-if='true || false'>
                        <div class="level-item">
                            <button class="button is-small" @click="print">{{ strings.printPage }}</button>
                        </div>

                    </div>
                </nav>

                <figure class="table-container">
                    <table class="table is-striped is-narrow is-fullwidth">
                        <thead>
                            <tr>
                                <th>{{ strings.fiscalYear }}</th>

                                <th v-for="year in yearsLabels" width="7.145%" :key="year.label" v-text="year"></th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <th>{{ strings.totalRevenuesMeasures }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'totalRevenueMeasures'+year.label">
                                    <div class="field is-hidden-print ">
                                        <div class="control">
                                            <input class="input is-small" type="number"
                                                v-model.number="year.totalRevenueMeasures">
                                        </div>
                                    </div>
                                    <span class="is-print-only">{{ year.totalRevenueMeasures }}</span>
                                </td>
                            </tr>


                            <tr>
                                <th>{{ strings.totalProgramSpendingMeasures }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'totalProgramSpendingMeasures'+year.label">
                                    <div class="field is-hidden-print">
                                        <div class="control">
                                            <input class="input is-small" type="number"
                                                v-model.number="year.totalProgramSpendingMeasures">
                                        </div>
                                    </div>
                                    <span class="is-print-only">{{ year.totalProgramSpendingMeasures }}</span>
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.netChangeOnPrimaryBalance }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'netChangeOnPrimaryBalance'+year.label"
                                    v-text="year.netChangeOnPrimaryBalance"></td>
                            </tr>



                        </tbody>

                        <thead v-if="showBackEnd" style="border-top: 1px solid rgb(219, 219, 219);">
                            <tr>
                                <th :colspan='yearsLabels.length+1'>
                                    {{ strings.backEnd }}</th>
                            </tr>
                            <tr>
                                <th>{{ strings.fiscalYear }}</th>

                                <th v-for="year in yearsLabels" :key="year.label">{{ year }}</th>

                            </tr>

                        </thead>
                        <tbody v-if="showBackEnd" style="border-bottom: 1px solid rgb(219, 219, 219)">


                            <tr>
                                <th>{{ strings.day90TreasuryBillRate }}<br><small class="has-text-grey-light">%</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'day90TreasuryBillRate'+year.label">
                                    {{ year.day90TreasuryBillRate.toFixed(2) }}
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.year10BondRate }}<br><small class="has-text-grey-light">%</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'year10BondRate'+year.label">
                                    {{ parseFloat(year.year10BondRate).toFixed(2) }}
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.longTermBondRate }}<br><small class="has-text-grey-light">%</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'longTermBondRate'+year.label">
                                    {{ parseFloat(year.longTermBondRate).toFixed(2) }}
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.averageEffectiveInterestRate }}<br><small
                                        class="has-text-grey-light">%</small>
                                </th>
                                <td v-for="year in years.displayYears"
                                    :key="'averageEffectiveInterestRateForYear'+year.label">
                                    {{ years.averageEffectiveInterestRateForYear(year).toFixed(2) }}
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.debtChargesOnPrimaryBalance }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'debtChargesOnPrimaryBalance'+year.label">
                                    {{ year.debtChargesOnPrimaryBalance.toFixed(2) }}
                                </td>
                            </tr>


                            <tr>
                                <th>{{ strings.newIncrementalBorrowing }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears"
                                    :key="'newIncrementalBorrowingForYear'+year.label">
                                    {{ years.newIncrementalBorrowingForYear(year).toFixed(2) }}
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.cumulativeIncrementalBorrowing }}<br><small
                                        class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears"
                                    :key="'cumulativeIncrementalBorrowingForYear'+year.label">
                                    {{ years.cumulativeIncrementalBorrowingForYear(year).toFixed(2) }}
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.incrementalLongTermBondStock }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears"
                                    :key="'incrementalLongTermBondStockForYear'+year.label">
                                    {{ years.incrementalLongTermBondStockForYear(year).toFixed(2) }}
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.incrementalMediumTermBondStock }}<br><small
                                        class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears"
                                    :key="'incrementalMediumTermBondStockForYear'+year.label">
                                    {{ years.incrementalMediumTermBondStockForYear(year).toFixed(2) }}
                                </td>
                            </tr>






                        </tbody>


                        <thead style="border-top: 1px solid rgb(219, 219, 219);">
                            <tr>
                                <th :colspan='yearsLabels.length+1'>
                                    {{ strings.outputs }}</th>
                            </tr>
                            <tr>
                                <th>{{ strings.fiscalYear }}</th>

                                <th v-for="year in yearsLabels" :key="year.label">{{ year }}</th>

                            </tr>
                        </thead>
                        <tbody style="border-bottom: 1px solid rgb(219, 219, 219)">

                            <tr>
                                <th>{{ strings.totalDebtCharges }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'totalDebtChargesForYear'+year.label">
                                    {{ years.totalDebtChargesForYear(year).toFixed(2) }}
                                </td>
                            </tr>

                            <tr>
                                <th>{{ strings.cumulativeSurplus }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears" :key="'cumulativeSurplusForYear'+year.label">
                                    {{ years.cumulativeSurplusForYear(year).toFixed(2) }}
                                </td>
                            </tr>
                            <tr>
                                <th>{{ strings.cumulativePublicDebtCharges }}<br><small class="has-text-grey-light">{{
                                        strings.inMillions }}</small>
                                </th>
                                <td v-for="year in years.displayYears"
                                    :key="'cumulativePublicDebtChargesForYear'+year.label">
                                    {{ years.cumulativePublicDebtChargesForYear(year).toFixed(2) }}
                                </td>
                            </tr>


                        </tbody>


                        <tfoot>
                            <tr>
                                <td :colspan='yearsLabels.length+1'>

                                    <div><sup>*</sup>{{ strings.surplusOfTheYearWarning }}</div>
                                </td>
                            </tr>
                        </tfoot>

                    </table>
                </figure>



            </main>
        </section>



    </main>


</template>

<script>
import collect from "collect.js";
import {Year} from "./year.js"
import {FiscalYears} from "./years.js"
import {lastUpdated, staticYears} from "./static-variables.js"
import {localizedStrings} from "./strings.js"

export default {
  
  props: {
    publicPath: String
  },
  data() {
        return {
            years: new FiscalYears(),
            showBackEnd: false,
            lastUpdated: lastUpdated
        };

    },

    mounted() {
        if (this.selectedLanguage) {
            document.title = this.strings.title + " - " + this.strings.pbo;
        }
    },


    computed: {
        /**
         * Retrieve the currently selected language using a `lang` url parameter. If the language is not set
         * or if the language is not supported (anything else but fr or en), just return null. When no
         * language is set, only the page's header (with languager selector) will be displayed. 
         */
        selectedLanguage() {
            return document.documentElement.lang;
        },

        /**
         * Return a nicely formatted list of years. Extracted using variable `dayRate90` defined
         * in `static-variables.js`.
         */
        yearsLabels() {
            return collect(this.years.displayYears).pluck("label").toArray();
        },

        /**
         * Pick only the strings in the current locale. Used to avoid using `[selectedLanguage]` everywhere
         * in our views.
         */
        strings() {
            return collect(localizedStrings).map((locale) => {
                return locale[this.selectedLanguage];
            }).items;
        }
    },

    methods: {
        print() {
            window.print();
        }
    }
    ,

    filters: {
        percentage: function (percentage) {
            percentage = Math.round(percentage * 100);
            return this.selectedLanguage === "fr" ? `${percentage} %` : `${percentage}%`;
        }
    }
};
</script>
<style>
@import 'bulma/css/bulma.css';

[v-cloak] {
  display: none
}

h1 {
  color: #2F4858;
}

[v-cloak] {
    display: none
}


.is-print-only {
    display: none;
}

@media print {
    @page {
        size: landscape
    }

    body {
        font-size: 12px;
    }

    .is-hidden-print {
        display: none !important;
    }

    .is-print-only {
        display: inline-block;
    }

    .table td {
        border: 1px solid rgb(238, 238, 238);
    }

    .table-container {
        overflow-x: hidden;
    }
}

.table td {
    text-align: right;
}

.table td input {
    text-align: right;
}

.table>thead>tr>th:not(:first-child) {
    text-align: right;
}

.table>thead:not(:first-child)>tr:first-child>th {
    padding: 2em 0.5em 1em 0.5em;
    font-size: 1.25em;
    text-align: center;
}
</style>
