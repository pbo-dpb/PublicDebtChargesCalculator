<template>

    <main id="app" class="flex flex-col gap-4" v-cloak>

        <header class="print:hidden prose dark:prose-invert max-w-none flex flex-col gap-4">
            <div v-html="descriptionHtml"></div>
            <small>{{ strings.updatedOn }} {{ lastUpdated }}</small>
        </header>
        <nav class="flex print:hidden flex-row justify-end items-center">

            <button
                class="text-sm font-semibold px-4 py-2 text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-800 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
                @click="print">{{ strings.printPage
                }}</button>
        </nav>

        <!-- 
            Inputs
        -->
        <section class="flex flex-col divide-y divide-blue-100 dark:divide-blue-800">
            <FlexibleRow class="hidden md:grid" aria-hidden="true">
                <template #title>

                </template>
                <template #years>
                    <div v-for="year in yearsLabels" v-text="year" class="print:text-xs font-semibold text-right">
                    </div>
                </template>
            </FlexibleRow>

            <FlexibleRow :editable="true">
                <template #title>
                    {{ strings.totalRevenuesMeasures }}
                    <Unit>{{ strings.units.millions }}</Unit>
                </template>
                <template #years>
                    <div v-for="year in years.displayYears">
                        <Field v-model.number="year.totalRevenueMeasures" :label="year.label">
                        </Field>

                    </div>
                </template>
            </FlexibleRow>


            <FlexibleRow :editable="true">
                <template #title>
                    {{ strings.totalProgramSpendingMeasures }}
                    <Unit>{{ strings.units.millions }}</Unit>
                </template>
                <template #years>
                    <div v-for="year in years.displayYears">
                        <Field v-model.number="year.totalProgramSpendingMeasures" :label="year.label">
                        </Field>

                    </div>
                </template>
            </FlexibleRow>


        </section>

        <!-- 
            General Outputs
        -->


        <section class="flex flex-col divide-y divide-gray-300 ">


            <h3 class="p-2 -mx-2 text-xl font-light">{{ strings.ouputsTitle }}</h3>

            <FlexibleRow v-for="output in generalOutputs">
                <template #title>
                    {{ output.label }}<Unit>{{ output.unit }}</Unit>
                </template>
                <template #years>
                    <div v-for="year in years.displayYears">
                        <Field :model-value="years[output.id + 'ForYear'](year)" :label="year.label" readonly>
                        </Field>
                    </div>
                </template>
            </FlexibleRow>
        </section>

        <!-- 
            Backend Outputs
         -->


        <div class="flex flex-row justify-center">
            <BackendToggle :label="strings.showBackEnd" v-model="showBackEnd"></BackendToggle>
        </div>


        <section v-if="showBackEnd" v-for="(outputGroup, outputGroupLabel) in backendOutputs"
            class="flex flex-col divide-y divide-gray-300">

            <h3 class="p-2 -mx-2 text-xl font-light" v-if="outputGroupLabel">{{ outputGroupLabel }}</h3>


            <FlexibleRow v-for="output in outputGroup">
                <template #title>
                    {{ output.label }}
                    <Unit>{{ output.unit }}</Unit>

                </template>
                <template #years>
                    <div v-for="year in years.displayYears">
                        <Field :model-value="retrieveValueForOutputYear(output, year)" :label="year.label" readonly
                            :is-static="output.isStatic">
                        </Field>
                    </div>
                </template>
            </FlexibleRow>
        </section>


        <footer class="prose dark:prose-invert prose-sm max-w-none">
            <sup>*</sup>{{ strings.surplusOfTheYearWarning }}
        </footer>


    </main>


</template>

<script>
import collect from "collect.js";
import { generalOutputs, backendOutputs } from "./outputs.js"
import { Year } from "./year.js"
import { FiscalYears } from "./years.js"
import { lastUpdated, staticYears } from "./static-variables.js"
import { localizedStrings } from "./strings.js"
import { marked } from "marked"
import FlexibleRow from "./FlexibleRow.vue"
import Field from "./Field.vue"
import BackendToggle from "./BackendToggle.vue"
import Unit from "./Unit.vue"

export default {

    components: {
        FlexibleRow,
        Field,
        BackendToggle,
        Unit
    },

    props: {
        publicPath: String
    },
    data() {
        return {
            years: new FiscalYears(),
            showBackEnd: true,
            lastUpdated: lastUpdated,
            generalOutputs: generalOutputs
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
        },


        backendOutputs() {
            console.log(collect(backendOutputs).groupBy('group').items);
            return collect(backendOutputs).groupBy('group').items;
        }

    },

    methods: {
        print() {
            window.print();
        },

        retrieveValueForOutputYear(output, year) {
            const outVal = this.years[output.id + 'ForYear'](year);
            if (typeof outVal === "number")
                return outVal.toFixed(2)
            if (outVal === false)
                return ""
            return outVal;
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
