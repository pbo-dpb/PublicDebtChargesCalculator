<template>
    <section class="border-y -mx-8 border-gray-300 px-8 py-4 my-8 bg-gray-100 dark:bg-gray-950 flex flex-col gap-4">
        <div class="flex flex-row justify-between items-center">
            <div class="font-mono text-gray-800 dark:text-white text-center">🔧 DEBUG</div>
            <Button @click="switchLanguage">{{
                language ==
                'en'
                ? 'fr' : 'en' }}</Button>
        </div>
        <div class="flex flex-col gap-2 text-sm font-mono">
            <div>{{ currentlyLoadedPayloadLastUpdatedDate }} <span v-if="!hasCustomPayload">(current | <a
                        class="underline text-blue-800" :href="payloadUrl" :download="payloadUrl">download</a>)</span><span
                    v-else>(custom file)</span>
            </div>
            <hr>
            <label>Replace by custom file (.xlsx)<br>
                <input type="file" @change="handleFileUpload" accept=".xlsx" />
            </label>



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
            hasCustomPayload: false
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
        handleFileUpload(event) {
            const file = event.target.files[0]
            if (file) {
                this.workbookStore.loadWorkbook(file)
                this.hasCustomPayload = true
            }
        },
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
