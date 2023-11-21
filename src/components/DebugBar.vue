<template>
    <section
        class="border-y -mx-8 border-gray-300 px-8 py-4 my-8 bg-gray-100 dark:bg-gray-950 flex flex-row justify-between items-center">
        <div class="font-mono text-gray-800 dark:text-white text-center">🔧 DEBUG</div>
        <Button @click="language = (language == 'en') ? 'fr' : 'en'">{{
            language ==
            'en'
            ? 'fr' : 'en' }}</Button>
    </section>
</template>
  
<script>
import { mapWritableState } from 'pinia'
import Button from './Button.vue'
import { useLocalizationsStore } from '../stores/localizations.js'

export default {
    computed: {
        ...mapWritableState(useLocalizationsStore, ['language']),
    },

    components: {
        Button,
    },

};
</script>
