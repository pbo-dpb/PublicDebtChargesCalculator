<template>
    <div id="app" class="flex flex-col gap-4" v-cloak>
        <DebugBar></DebugBar>


        <CollapsibleIntro></CollapsibleIntro>

        <nav class="flex print:hidden flex-row justify-end items-center gap-4">

            <Button type="negative" @click="clear" :disabled="!workbookStore.isDirty">{{ strings.clearUserInput
            }}</Button>

        </nav>

        <LoadingIndicator class="w-8 h-8" v-if="workbookStore.loading"></LoadingIndicator>
        <ErrorBlock v-if="workbookStore.error"></ErrorBlock>
        <ErrorBlock v-if="workbookStore.isBeingMaintained"></ErrorBlock>
        <main v-if="!workbookStore.loading && !workbookStore.error && !workbookStore.isBeingMaintained">

            <FlexibleRow class="hidden md:grid sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-300"
                aria-hidden="true">
                <template #title>

                </template>
                <template #years>
                    <div v-for="(year, column) in workbookStore.fiscalYears" v-text="year"
                        class="print:text-xs font-semibold text-right">
                    </div>
                </template>
            </FlexibleRow>

            <!-- 
            Inputs
        -->
            <section class="flex flex-col divide-y divide-blue-100 dark:divide-blue-800 ">


                <FlexibleRow :editable="true" v-for="input in workbookStore.inputs">
                    <template #title>
                        {{ input.label[language] }}
                        <Unit v-if="input.unit">{{ strings[`units_${input.unit}`] }}</Unit>
                    </template>
                    <template #years>
                        <div v-for="(userValue, fiscalYear) in workbookStore.userValues[input.id]">
                            <Field v-model="userValue.value" :label="fiscalYear" @input="handleUpdatedUserInput"
                                @change="handleUpdatedUserInput">
                            </Field>

                        </div>
                    </template>
                </FlexibleRow>

            </section>


            <div class="w-full flex flex-row  justify-center pt-4">
                <Button type="primary" @click="requestSheetUpdate" :disabled="!workbookStore.isDirty"
                    :loading="workbookStore.loadingOutputsCells">
                    {{ strings.cta }}
                </Button>
            </div>

            <Outputs></Outputs>
        </main>

    </div>
</template>

<script>

import { defineAsyncComponent } from 'vue'
import FlexibleRow from "./components/FlexibleRow.vue"
import Field from "./components/Field.vue"
import WrapperEventDispatcher from "./WrapperEventDispatcher.js"
import CollapsibleIntro from "./components/CollapsibleIntro.vue";
import Outputs from "./components/Outputs.vue";
import Unit from "./components/Unit.vue";
import Button from "./components/Button.vue";
import { mapState } from 'pinia'
import { useLocalizationsStore } from './stores/localizations.js'
import { useWorkbookStore } from "./stores/workbook.js"
import LoadingIndicator from "./components/LoadingIndicator.vue";


const DebugBar = defineAsyncComponent(() =>
    import("./components/DebugBar.vue")
);


const ErrorBlock = defineAsyncComponent(() =>
    import("./components/ErrorBlock.vue")
);

export default {

    components: {
        FlexibleRow,
        Field,
        Unit,
        DebugBar,
        CollapsibleIntro,
        Outputs,
        LoadingIndicator,
        ErrorBlock,
        Button
    },

    setup() {
        const workbookStore = useWorkbookStore()
        return { workbookStore }
    },
    computed: {
        ...mapState(useLocalizationsStore, ['strings', 'language']),
    },

    mounted() {
        this.setPageTitle();
        this.loadCustomWorksheet();
        this.workbookStore.retrieveCurrentLambdaWorkbookId();
    },

    watch: {
        language() {
            this.setPageTitle();
        }
    },

    methods: {
        async loadCustomWorksheet() {
            this.workbookStore.loadWorkbook();
        },
        setPageTitle() {
            (new WrapperEventDispatcher(this.strings.title, null)).dispatch();
        },

        clear() {
            this.workbookStore.clearUserInput();
        },


        handleUpdatedUserInput() {
            this.workbookStore.isDirty = true;
        },

        requestSheetUpdate() {
            this.workbookStore.updateSheet();
        },
    },


};
</script>
