var app = new Vue({
    el: '#app',
    data() {
        return {
            years: new FiscalYears(),
            showBackEnd: false,
            showCalculations: false,
            lastUpdated: lastUpdated
        };

    },

    mounted() {
        if (this.selectedLanguage) {
            document.title = this.strings.title + " - " + this.strings.pbo;
        }
    },


    computed: {
        /**
         * Retrieve the currently selected language using a `lang` url parameter. If the language is not set
         * or if the language is not supported (anything else but fr or en), just return null. When no
         * language is set, only the page's header (with languager selector) will be displayed. 
         */
        selectedLanguage() {
            const url = new URL(document.URL);
            return ['en', 'fr'].includes(url.searchParams.get('lang')) ? url.searchParams.get('lang') : null;
        },

        /**
         * Return a nicely formatted list of years. Extracted using variable `dayRate90` defined
         * in `static-variables.js`.
         */
        yearsLabels() {
            return collect(this.years.years).pluck("label").toArray();
        },

        /**
         * Pick only the strings in the current locale. Used to avoid using `[selectedLanguage]` everywhere
         * in our views.
         */
        strings() {
            return collect(localizedStrings).map((locale) => {
                return locale[this.selectedLanguage];
            }).items;
        }
    },

    methods: {
        print() {
            window.print();
        }
    }


})