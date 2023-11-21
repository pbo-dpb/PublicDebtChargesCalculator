<template>
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
</template>
<script>
import collect from "collect.js";

import { generalOutputs, backendOutputs } from "../outputs.js"
import FlexibleRow from "./FlexibleRow.vue"
import Field from './Field.vue'
import ValueWarning from "./ValueWarning.vue"
import Unit from "./Unit.vue"
import BackendToggle from "./BackendToggle.vue"

import { mapState } from 'pinia'
import { useLocalizationsStore } from '../stores/localizations.js'

export default {
    props: ['years'],
    data() {
        return {
            generalOutputs,
            showBackEnd: false,
        }
    },
    components: {
        FlexibleRow,
        Field,
        ValueWarning,
        Unit,
        BackendToggle
    },
    computed: {
        ...mapState(useLocalizationsStore, ['strings', 'language']),
        backendOutputs() {
            return collect(backendOutputs).groupBy('group').items;
        },
    },
    methods: {
        retrieveValueForOutputYear(output, year) {
            const outVal = this.years[output.id + 'ForYear'](year);


            if (typeof outVal === "number") {
                return Number(outVal).toFixed(this.showBackEnd ? 1 : 0);
            }


            return outVal;
        },

    }
};

</script>