<template>
    <section class="border-y -mx-8 border-gray-300 px-8 py-4 my-8 bg-gray-100 dark:bg-gray-950 flex flex-col gap-4">
        <div class="flex flex-row justify-between items-center">
            <div class="font-mono text-gray-800 dark:text-white text-center">🔧 Current client payload: {{
                currentlyLoadedPayloadLastUpdatedDate }}</div>
            <Button @click="switchLanguage">{{
                language ==
                'en'
                ? 'fr' : 'en' }}</Button>
        </div>

    </section>
</template>
  
<script>
import payloadUrl from '../assets/payload.xlsx?url'
import { mapWritableState } from 'pinia'
import Button from './Button.vue'
import { useLocalizationsStore } from '../stores/localizations.js'
import { useWorkbookStore } from "../stores/workbook.js"

export default {

    data() {
        return {
            payloadUrl,
        }
    },
    components: {
        Button,
    },
    setup() {
        const workbookStore = useWorkbookStore()
        return { workbookStore }
    },
    methods: {

        switchLanguage() {
            this.language = (this.language == 'en') ? 'fr' : 'en'
        }
    },
    computed: {
        ...mapWritableState(useLocalizationsStore, ['language']),
        currentlyLoadedPayloadLastUpdatedDate() {
            if (!this.workbookStore.workbook) return;
            try {
                return this.workbookStore.workbook.Props.ModifiedDate.toLocaleString()
            } catch (error) {
                return null
            }
        }
    }

};
</script>
