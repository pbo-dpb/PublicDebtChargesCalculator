<template>
    <!-- 
            General Outputs
        -->

    <section class="flex flex-col divide-y divide-gray-300 ">

        <h3 class="p-2 -mx-2 text-xl font-light">{{ strings.ouputsTitle }}</h3>

        <FlexibleRow v-for="output in workbookStore.outputs">
            <template #title>
                {{ output.label[language] }}
                <Unit v-if="output.unit">{{ strings[`units_${output.unit}`] }}</Unit>
                <ValueWarning v-if="output.warning[language]">{{ output.warning[language] }}</ValueWarning>
            </template>
            <template #years>
                <div v-for="(valueForFiscalYear, fiscalYear) in output.fiscalYears">
                    <Field :label="fiscalYear" :model-value="valueForFiscalYear" readonly>
                    </Field>
                </div>
            </template>
        </FlexibleRow>
    </section>

    <!--
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
                <div v-for="year in fiscalYearsStore.displayYears">
                    <Field :model-value="retrieveValueForOutputYear(output, year)" :label="year.label" readonly
                        :is-static="output.isStatic">
                    </Field>
                </div>
            </template>
        </FlexibleRow>

    </section>
-->
</template>
<script>

import FlexibleRow from "./FlexibleRow.vue"
import Field from './Field.vue'
import ValueWarning from "./ValueWarning.vue"
import Unit from "./Unit.vue"
import BackendToggle from "./BackendToggle.vue"

import { mapState } from 'pinia'
import { useLocalizationsStore } from '../stores/localizations.js'
import { useWorkbookStore } from "../stores/workbook.js"

export default {
    data() {
        return {
            showBackEnd: false,
        }
    },
    setup() {
        const workbookStore = useWorkbookStore()
        return { workbookStore }
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

    },
    methods: {

    }
};

</script>