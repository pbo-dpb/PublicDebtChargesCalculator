<template>

    <main id="app" class="flex flex-col gap-4" v-cloak>

        <header class="print:hidden prose max-w-none flex flex-col gap-4">
            <div v-html="descriptionHtml"></div>
            <small>{{ strings.updatedOn }} {{ lastUpdated }}</small>
        </header>
        <nav class="flex print:hidden flex-row justify-between items-center">
            <label class="checkbox">
                <input type="checkbox" v-model="showBackEnd">
                {{ strings.showBackEnd }}
            </label>
            <button
                class="text-sm font-semibold p-2 text-blue-800 dark:text-blue-100 bg-blue-100 dark:bg-blue-800 rounded"
                @click="print">{{ strings.printPage
                }}</button>
        </nav>


        <section class="flex flex-col divide-y divide-gray-300">
            <FlexibleRow class="hidden md:grid">
                <template #title>

                </template>
                <template #years>
                    <div v-for="year in yearsLabels" :key="year.label" v-text="year"
                        class="text-sm font-semibold text-right">
                    </div>
                </template>
            </FlexibleRow>

            <FlexibleRow>
                <template #title>
                    {{ strings.totalRevenuesMeasures }}<br><small class="has-text-grey-light">{{
                            strings.inMillions
                    }}</small>
                </template>
                <template #years>
                    <div v-for="year in years.displayYears" :key="'totalRevenueMeasures' + year.label">
                        <InputField v-model.number="year.totalRevenueMeasures">
                        </InputField>

                    </div>
                </template>
            </FlexibleRow>


            <FlexibleRow>
                <template #title>
                    {{ strings.totalProgramSpendingMeasures }}<br><small class="has-text-grey-light">{{
                            strings.inMillions
                    }}</small>
                </template>
                <template #years>
                    <div v-for="year in years.displayYears" :key="'totalProgramSpendingMeasures' + year.label">
                        <InputField v-model.number="year.totalProgramSpendingMeasures">
                        </InputField>

                    </div>
                </template>
            </FlexibleRow>


            <FlexibleRow>
                <template #title>
                    {{ strings.netChangeOnPrimaryBalance }}<br><small class="has-text-grey-light">{{
                            strings.inMillions
                    }}</small>
                </template>
                <template #years>
                    <OutputField v-for="year in years.displayYears" :key="'netChangeOnPrimaryBalance' + year.label"
                        v-model="year.netChangeOnPrimaryBalance"></OutputField>
                </template>
            </FlexibleRow>





        </section>


        <template v-if="showBackEnd">


        </template>





        <footer class="prose prose-sm max-w-none">
            <sup>*</sup>{{ strings.surplusOfTheYearWarning }}
        </footer>


    </main>


</template>

<script>
import collect from "collect.js";
import { Year } from "./year.js"
import { FiscalYears } from "./years.js"
import { lastUpdated, staticYears } from "./static-variables.js"
import { localizedStrings } from "./strings.js"
import { marked } from "marked"
import FlexibleRow from "./FlexibleRow.vue"
import InputField from "./InputField.vue"
import OutputField from "./OutputField.vue"

export default {

    components: {
        FlexibleRow,
        InputField,
        OutputField
    },

    props: {
        publicPath: String
    },
    data() {
        return {
            years: new FiscalYears(),
            showBackEnd: true,
            lastUpdated: lastUpdated
        };

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
         * Retrieve a localized description for the tool. This markdown content is parsed to HTML.
         */
        descriptionHtml() {
            return marked.parse(this.strings.description);
        },

        /**
         * Return a nicely formatted list of years.
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
@import "./index.css";
</style>
