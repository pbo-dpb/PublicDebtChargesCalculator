import { defineStore } from 'pinia'
import en from '../assets/en.json'
import fr from '../assets/fr.json'

export const useLocalizationsStore = defineStore('localizations', {
    state: () => ({
        language: document.documentElement.lang,
        iStrings: { en, fr }
    }),

    getters: {
        strings(state) {

            let strings = state.iStrings[state.language]
            return strings
        },
    },
})