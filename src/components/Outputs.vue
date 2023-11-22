<template>
    <!-- 
            General Outputs
        -->

    <!--<section class="flex flex-col divide-y divide-gray-300 ">

        <h3 class="p-2 -mx-2 text-xl font-light">{{ strings.ouputsTitle }}</h3>

        <FlexibleRow v-for="output in generalOutputs">
            <template #title>
                {{ output.label }}
                <Unit v-if="output.unit">{{ output.unit }}</Unit>
                <ValueWarning v-if="output.warning">{{ output.warning }}</ValueWarning>
            </template>
            <template #years>
                <div v-for="year in fiscalYearsStore.displayYears">
                    <Field :model-value="retrieveValueForOutputYear(output, year)" :label="year.label" readonly>
                    </Field>
                </div>
            </template>
        </FlexibleRow>
    </section>-->
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

const UNIT_MILLIONS = "millions"



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