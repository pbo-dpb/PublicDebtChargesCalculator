<template>
    <!-- 
            General Outputs
        -->

    <section class="flex flex-col divide-y divide-gray-300 ">

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
    </section>

    <!-- 
Backend Outputs
-->


    <div class="flex flex-row justify-center">
        <BackendToggle :label="strings.showBackEnd" v-model="showBackEnd"></BackendToggle>
    </div>


    <section v-if="showBackEnd" v-for="(outputGroup, outputGroupLabel) in backendOutputs"
        class="flex flex-col divide-y divide-gray-300">

        <h3 class="p-2 -mx-2 text-xl font-light" v-if="outputGroupLabel">{{ outputGroupLabel }}</h3>


        <FlexibleRow v-for="output in outputGroup">
            <template #title>
                {{ output.label }}
                <Unit>{{ output.unit }}</Unit>

            </template>
            <template #years>
                <div v-for="year in fiscalYearsStore.displayYears">
                    <Field :model-value="retrieveValueForOutputYear(output, year)" :label="year.label" readonly
                        :is-static="output.isStatic">
                    </Field>
                </div>
            </template>
        </FlexibleRow>
    </section>
</template>
<script>
import collect from "collect.js";

import FlexibleRow from "./FlexibleRow.vue"
import Field from './Field.vue'
import ValueWarning from "./ValueWarning.vue"
import Unit from "./Unit.vue"
import BackendToggle from "./BackendToggle.vue"

import { mapState } from 'pinia'
import { useLocalizationsStore } from '../stores/localizations.js'
import { useFiscalYearsStore } from "../stores/years.js"

const UNIT_MILLIONS = "millions"


class Output {
    constructor(stringBank, id, group, unit, isStatic) {
        this.id = id;
        this.isStatic = isStatic;
        this.group = group ? stringBank.groups[group] : null;
        this.unit = unit ? stringBank.units[unit] : '';
        this.label = stringBank[id].label;
        this.warning = stringBank[id].warning;
    }
}

export default {
    data() {
        return {
            showBackEnd: false,
        }
    },
    setup() {
        const fiscalYearsStore = useFiscalYearsStore()
        return { fiscalYearsStore }
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
        generalOutputs() {
            return [
                new Output(this.strings, "netChangeOnPrimaryBalance", null, UNIT_MILLIONS),
                /*new Output(this.strings, "annualPublicDebtCharge", null, UNIT_MILLIONS),
                new Output(this.strings, "surplusOrDeficit", null, UNIT_MILLIONS),
                new Output(this.strings, "cumulativeSurplus", null, UNIT_MILLIONS),
                new Output(this.strings, "cumulativePublicDebtCharges", null, UNIT_MILLIONS),*/
            ]
        },
        backendOutputs() {
            const backendOutputs = [

                /*new Output(this.strings, "day90TreasuryBillsRate", 'interestRates', null, true),
                new Output(this.strings, "year10BondRate", 'interestRates', null, true),
                new Output(this.strings, "longTermBondRate", 'interestRates', null, true),
                new Output(this.strings, "marginalEffectiveInterestRate", 'interestRates', null, true),

                new Output(this.strings, "debtChargesOnPrimaryBalances", 'overallNewDebt', null),
                new Output(this.strings, "debtChargesOnExistingDebtStock", 'overallNewDebt', null),
                new Output(this.strings, "newBorrowing", 'overallNewDebt', null),
                new Output(this.strings, "debtStock", 'overallNewDebt', null),

                new Output(this.strings, "treasuryBillStock", "incrementalGovernmentBondsComposition", null),
                new Output(this.strings, "mediumTermBondsStock", 'incrementalGovernmentBondsComposition', null),
                new Output(this.strings, "longTermBondsStock", 'incrementalGovernmentBondsComposition', null),*/

            ];
            return collect(backendOutputs).groupBy('group').items;
        }
    },
    methods: {
        retrieveValueForOutputYear(output, year) {
            const outVal = this.fiscalYearsStore[output.id + 'ForYear'](year);


            if (typeof outVal === "number") {
                return Number(outVal).toFixed(this.showBackEnd ? 1 : 0);
            }


            return outVal;
        },

    }
};

</script>