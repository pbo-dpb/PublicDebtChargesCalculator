import { defineStore } from 'pinia'
import { localizedStrings } from "../strings.js"
import collect from "collect.js";


export default defineStore('localizations', {
    state: () => ({
        language: document.documentElement.lang,
        iStrings: { en: null, fr: null, a: localizedStrings }
    }),

    getters: {
        strings(state) {

            let strings = state.iStrings[state.language] ? state.iStrings[state.language] : null;
            if (!strings) {
                strings = collect(state.iStrings.a).map((locale) => {
                    return locale[state.language];
                }).items
                state.iStrings[state.language] = strings;
            }

            return strings
        },
    },
})