<template>
    <div class="flex flex-col gap-4 mt-4 transition-all" :inert="shouldHide"
        :class="{ blur: shouldHide, 'opacity-60 grayscale': workbookStore.areCurrentUserInputsDifferentFromProcessed }"
        aria-live="assertive">
        <!-- General Outputs -->

        <section class="flex flex-col divide-y divide-gray-300 ">

            <h3 class="p-2 -mx-2 text-xl font-light">{{ strings.ouputsTitle }}</h3>

            <Output v-for="output in workbookStore.outputs" :key="output.id" :row="output" :round-to="roundTo"></Output>
        </section>


        <!-- Backend Toggle -->
        <div class="flex flex-row justify-center">
            <BackendToggle :label="strings.showBackEnd" v-model="showBackEnd"></BackendToggle>
        </div>

        <!-- Backend Outputs -->
        <section v-if="showBackEnd" v-for="(outputGroup, outputGroupKey) in workbookStore.backend"
            class="flex flex-col divide-y divide-gray-300" :key="outputGroupKey">

            <h3 class="p-2 -mx-2 text-xl font-light" v-if="outputGroup.label[language]">{{ outputGroup.label[language]
            }}
            </h3>

            <Output v-for="output in outputGroup.rows" :key="output.id" :row="output" :round-to="roundTo"></Output>

        </section>

    </div>
</template>
<script>
import BackendToggle from "./BackendToggle.vue"
import Output from "./Output.vue"

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
        BackendToggle,
        Output
    },
    computed: {
        ...mapState(useLocalizationsStore, ['strings', 'language']),
        roundTo() {
            return this.showBackEnd ? 1 : 0
        },
        shouldHide() {
            return this.workbookStore.loadingOutputsCells || !this.workbookStore.processed
        }
    },
    methods: {

    }
};

</script>