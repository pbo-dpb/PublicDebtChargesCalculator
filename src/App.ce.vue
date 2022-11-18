<template>

    <main id="app" class="flex flex-col gap-4" v-cloak>

        <header class="print:hidden prose dark:prose-invert max-w-none flex flex-col gap-4">
            <div v-html="descriptionHtml"></div>
            <small>{{ strings.updatedOn }} {{ lastUpdated }}</small>
        </header>
        <nav class="flex print:hidden flex-row justify-between items-center">
            <label class="checkbox">
                <input type="checkbox" v-model="showBackEnd">
                {{ strings.showBackEnd }}
            </label>
            <button
                class="text-sm font-semibold px-4 py-2 text-blue-800 dark:text-blue-100 bg-blue-100 dark:bg-blue-800 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
                @click="print">{{ strings.printPage
                }}</button>
        </nav>


        <section class="flex flex-col divide-y divide-gray-300">
            <FlexibleRow class="hidden md:grid" aria-hidden="true">
                <template #title>

                </template>
                <template #years>
                    <div v-for="year in yearsLabels" v-text="year" class="print:text-xs font-semibold text-right">
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
                    <div v-for="year in years.displayYears">
                        <Field v-model.number="year.totalRevenueMeasures" :label="year.label">
                        </Field>

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
                    <div v-for="year in years.displayYears">
                        <Field v-model.number="year.totalProgramSpendingMeasures" :label="year.label">
                        </Field>

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
                    <Field v-for="year in years.displayYears" v-model="year.netChangeOnPrimaryBalance"
                        :label="year.label" readonly></Field>
                </template>
            </FlexibleRow>




        </section>


        <template v-if="showBackEnd">


        </template>


        <footer class="prose dark:prose-invert prose-sm max-w-none">
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
import Field from "./Field.vue"

export default {

    components: {
        FlexibleRow,
        Field,
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
