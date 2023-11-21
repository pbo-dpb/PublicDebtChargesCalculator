<template>
    <main id="app" class="flex flex-col gap-4" v-cloak>
        <DebugBar></DebugBar>


        <CollapsibleIntro :last-updated="lastUpdated"></CollapsibleIntro>

        <nav class="flex print:hidden flex-row justify-end items-center gap-4">

            <button
                class="text-sm font-semibold px-4 py-2 text-red-900 dark:text-red-100 bg-red-100 dark:bg-red-800 rounded "
                :class="{ 'opacity-75': !isDirty, 'hover:bg-red-200 dark:hover:bg-red-700': isDirty }" @click="clear"
                :disabled="!isDirty">{{ strings.clearUserInput
                }}</button>

        </nav>

        <FlexibleRow class="hidden md:grid sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-300"
            aria-hidden="true">
            <template #title>

            </template>
            <template #years>
                <div v-for="year in yearsLabels" v-text="year" class="print:text-xs font-semibold text-right">
                </div>
            </template>
        </FlexibleRow>

        <!-- 
            Inputs
        -->
        <section class="flex flex-col divide-y divide-blue-100 dark:divide-blue-800 ">


            <FlexibleRow :editable="true">
                <template #title>
                    {{ strings.totalRevenuesMeasures }}
                    <Unit>{{ strings.units.millions }}</Unit>
                </template>
                <template #years>
                    <div v-for="year in years.displayYears">
                        <Field v-model="year.totalRevenueMeasures" :label="year.label" @input="handleUpdatedUserInput"
                            @change="handleUpdatedUserInput">
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
                        <Field v-model="year.totalProgramSpendingMeasures" :label="year.label"
                            @input="handleUpdatedUserInput" @change="handleUpdatedUserInput">
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
                    {{ output.label }}
                    <Unit v-if="output.unit">{{ output.unit }}</Unit>
                    <ValueWarning v-if="output.warning">{{ output.warning }}</ValueWarning>
                </template>
                <template #years>
                    <div v-for="year in years.displayYears">
                        <Field :model-value="retrieveValueForOutputYear(output, year)" :label="year.label" readonly>
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

    </main>
</template>

<script>
import collect from "collect.js";
import { defineAsyncComponent } from 'vue'

import { generalOutputs, backendOutputs } from "./outputs.js"
import { FiscalYears } from "./years.js"
import { lastUpdated } from "./static-variables.js"
import { marked } from "marked"
import FlexibleRow from "./FlexibleRow.vue"
import Field from "./Field.vue"
import BackendToggle from "./BackendToggle.vue"
import Unit from "./Unit.vue"
import ValueWarning from "./ValueWarning.vue"
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"
import CollapsibleIntro from "./components/CollapsibleIntro.vue";

import { mapState } from 'pinia'
import Localizations from './stores/localizations.js'
const DebugBar = defineAsyncComponent(() =>
    import("./components/DebugBar.vue")
);

export default {

    components: {
        FlexibleRow,
        Field,
        BackendToggle,
        Unit,
        ValueWarning,
        DebugBar,
        CollapsibleIntro
    },

    props: {
        publicPath: String
    },
    data() {
        return {
            years: new FiscalYears(),
            showBackEnd: false,
            lastUpdated,
            generalOutputs: generalOutputs,
            isDirty: window.localStorage.getItem("pdcc-user-input")
        };

    },



    computed: {
        ...mapState(Localizations, ['strings', 'language']),


        /**
         * Return a nicely formatted list of years.
         * in `static-variables.js`.
         */
        yearsLabels() {
            return collect(this.years.displayYears).pluck("label").toArray();
        },

        backendOutputs() {
            return collect(backendOutputs).groupBy('group').items;
        },


    },

    mounted() {
        this.setPageTitle();
    },

    watch: {
        language() {
            this.setPageTitle();
        }
    },

    methods: {
        setPageTitle() {
            (new WrapperEventDispatcher(this.strings.title, null)).dispatch();
        },

        clear() {
            window.localStorage.removeItem("pdcc-user-input");
            location.reload();
        },

        retrieveValueForOutputYear(output, year) {
            const outVal = this.years[output.id + 'ForYear'](year);
            if (typeof outVal === "number") {
                return Number(outVal).toFixed(this.showBackEnd ? 1 : 0);
            }


            return outVal;
        },

        handleUpdatedUserInput() {
            this.years.forget();
            this.isDirty = true;
            // Save user input
            window.localStorage.setItem("pdcc-user-input", JSON.stringify(collect(this.years.displayYears).mapWithKeys(year => {
                return [year.label, {
                    totalRevenueMeasures: parseFloat(year.totalRevenueMeasures),
                    totalProgramSpendingMeasures: parseFloat(year.totalProgramSpendingMeasures)
                }];
            }).items))
        }
    }
    ,

    filters: {
        percentage: function (percentage) {
            percentage = Math.round(percentage * 100);
            return this.language === "fr" ? `${percentage} %` : `${percentage}%`;
        }
    }
};
</script>
