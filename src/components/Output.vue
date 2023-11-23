<template>
    <FlexibleRow>
        <template #title>
            {{ row.label[language] }}
            <Unit v-if="row.unit">{{ strings[`units_${row.unit}`] }}</Unit>
            <RowDescription v-if="row.description[language]" :description="row.description[language]">
            </RowDescription>
            <RowDescription v-if="row.warning[language]" :description="row.warning[language]" type="warning">
            </RowDescription>
        </template>
        <template #years>
            <div v-for="(valueForFiscalYear, fiscalYear) in row.fiscalYears">
                <Field :label="fiscalYear"
                    :model-value="valueForFiscalYear !== null ? valueForFiscalYear.toFixed(roundTo) : false" readonly
                    :is-static="row.is_static">
                </Field>

            </div>
        </template>
    </FlexibleRow>
</template>
<script>
import Row from '../models/Row';
import FlexibleRow from './FlexibleRow.vue';
import Unit from './Unit.vue';
import RowDescription from './RowDescription.vue';
import Field from './Field.vue';
import { mapState } from 'pinia'
import { useLocalizationsStore } from '../stores/localizations.js'

export default {
    props: {
        row: {
            type: Row,
            required: true
        },
        roundTo: {
            type: Number,
            default: 0
        }
    },
    components: {
        FlexibleRow,
        Unit,
        RowDescription,
        Field
    },
    computed: {
        ...mapState(useLocalizationsStore, ['strings', 'language']),
    }
}

</script>