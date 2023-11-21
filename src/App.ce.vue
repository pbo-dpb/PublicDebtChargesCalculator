<template>
    <main id="app" class="flex flex-col gap-4" v-cloak>
        <DebugBar></DebugBar>


        <CollapsibleIntro></CollapsibleIntro>

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
                    <div v-for="year in fiscalYearsStore.displayYears">
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
                    <div v-for="year in fiscalYearsStore.displayYears">
                        <Field v-model="year.totalProgramSpendingMeasures" :label="year.label"
                            @input="handleUpdatedUserInput" @change="handleUpdatedUserInput">
                        </Field>

                    </div>
                </template>
            </FlexibleRow>


        </section>

        <Outputs></Outputs>

    </main>
</template>

<script>
import collect from "collect.js";
import { defineAsyncComponent } from 'vue'


import FlexibleRow from "./components/FlexibleRow.vue"
import Field from "./components/Field.vue"
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"
import CollapsibleIntro from "./components/CollapsibleIntro.vue";
import Outputs from "./components/Outputs.vue";
import Unit from "./components/Unit.vue";

import { mapState } from 'pinia'
import { useLocalizationsStore } from './stores/localizations.js'
import { useFiscalYearsStore } from "./stores/years.js"


const DebugBar = defineAsyncComponent(() =>
    import("./components/DebugBar.vue")
);

export default {

    components: {
        FlexibleRow,
        Field,
        Unit,
        DebugBar,
        CollapsibleIntro,
        Outputs,
    },

    props: {
        publicPath: String
    },
    data() {
        return {
            isDirty: window.localStorage.getItem("pdcc-user-input")
        };

    },
    setup() {
        const fiscalYearsStore = useFiscalYearsStore()
        return { fiscalYearsStore }
    },
    computed: {
        ...mapState(useLocalizationsStore, ['strings', 'language']),


        /**
         * Return a nicely formatted list of years.
         * in `static-variables.js`.
         */
        yearsLabels() {
            return collect(this.fiscalYearsStore.displayYears).pluck("label").toArray();
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


        handleUpdatedUserInput() {
            this.fiscalYearsStore.forget();
            this.isDirty = true;
            // Save user input
            window.localStorage.setItem("pdcc-user-input", JSON.stringify(collect(this.fiscalYearsStore.displayYears).mapWithKeys(year => {
                return [year.label, {
                    totalRevenueMeasures: parseFloat(year.totalRevenueMeasures),
                    totalProgramSpendingMeasures: parseFloat(year.totalProgramSpendingMeasures)
                }];
            }).items))
        }
    },


    filters: {
        percentage: function (percentage) {
            percentage = Math.round(percentage * 100);
            return this.language === "fr" ? `${percentage} %` : `${percentage}%`;
        }
    }
};
</script>
