<template>
    <div role="alert" class="bg-red-100 p-4 text-red-800 rounded font-semibold prose max-w-none" v-html="error">
    </div>
</template>
<script>
import { useWorkbookStore } from "../stores/workbook.js"
import { marked } from 'marked';

export default {


    setup() {
        const workbookStore = useWorkbookStore()
        return { workbookStore }
    },

    computed: {
        error() {
            return marked.parse(`⚠️ ${this.workbookStore.error}`)
        }
    }

};
</script>