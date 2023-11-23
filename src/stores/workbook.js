import { defineStore } from 'pinia'
import worksheetUrl from "../assets/payload.xlsx?url";
import { read } from "xlsx";
import XLSX_CALC from "xlsx-calc";
import Row from "../models/Row";

const MACHINE_READABLE_SHEET_NAME = "machine_readable"

export const useWorkbookStore = defineStore('workbook', {
    state: () => ({
        loading: true,
        error: null,
        workbook: null,
        userValues: {}
    }),

    getters: {

        sheet: (state) => {
            const machineReadableSheet = state.workbook.Sheets[MACHINE_READABLE_SHEET_NAME];
            if (!machineReadableSheet) {
                state.error = "Sheet named `machine_readable` cannot be found.";
            }
            return machineReadableSheet;
        },

        /**
         * An object of fiscal years that should be in user scope.
         * @returns Returns an object with the columns as keys and the fiscal years as values
         */
        fiscalYears() {
            const sheet = this.sheet;
            let fiscalYears = {};

            for (const property in sheet) {
                let cellPath = property;
                let cellValue = sheet[property].v;

                // Only include cells that are in the first row (row 1)
                if (cellPath.startsWith('!') || cellPath.replaceAll(/\D/g, '') !== '1') {
                    continue;
                }

                // Only include cells that are formatted as a fiscal year (e.g. 2020-2021)
                if (!cellValue.match(/^[0-9]{4}-[0-9]{4}$/g)) {
                    continue;
                }

                fiscalYears[cellPath.replaceAll(/[0-9]+$/g, '')] = cellValue;
            }
            return fiscalYears;
        },

        attributesColumns() {
            const sheet = this.sheet;
            let attributes = {
                id: null,
                type: null,
                label_en: null,
                label_fr: null,
                group_name_en: null,
                group_name_fr: null,
                description_en: null,
                description_fr: null,
                warning_en: null,
                warning_fr: null,
                unit: null,
                is_static: null,
            };

            for (const property in sheet) {
                let cellPath = property;
                let cellValue = sheet[property].v;

                // Only include cells that are in the first row (row 1)
                if (cellPath.startsWith('!') || cellPath.replaceAll(/\D/g, '') !== '1') {
                    continue;
                }
                let column = cellPath.replaceAll(/[0-9]+$/g, '');
                if (Object.keys(attributes).includes(cellValue)) {
                    attributes[cellValue] = column;
                }
            }

            if (Object.values(attributes).includes(null)) {
                this.error = "Attributes are missing from the spreadsheet.\n```\n" + JSON.stringify(attributes, null, 2) + "\n```";
            }

            return attributes;
        },

        rows() {
            const sheet = this.sheet;
            const attributesColumns = this.attributesColumns;
            const fiscalYears = this.fiscalYears;
            let rows = [];


            for (const property in sheet) {
                let cellPath = property;
                let cellValue = sheet[property].v;

                let rowNumber = cellPath.replaceAll(/\D/g, '');
                // Exclude all cells in first (row 1), sheet properties or cells that aren't in the id column
                if (cellPath.startsWith('!') || rowNumber === '1' || cellPath.replaceAll(/[0-9]+$/g, '') !== attributesColumns.id) {
                    continue;
                }


                let row = new Row();
                row.row = rowNumber;
                row.id = sheet[attributesColumns.id + rowNumber]?.v ?? null;
                row.type = sheet[attributesColumns.type + rowNumber]?.v ?? null;
                row.label.en = sheet[attributesColumns.label_en + rowNumber]?.v ?? null;
                row.label.fr = sheet[attributesColumns.label_fr + rowNumber]?.v ?? null;
                row.groupName.en = sheet[attributesColumns.group_name_en + rowNumber]?.v ?? null;
                row.groupName.fr = sheet[attributesColumns.group_name_fr + rowNumber]?.v ?? null;
                row.description.en = sheet[attributesColumns.description_en + rowNumber]?.v ?? null;
                row.description.fr = sheet[attributesColumns.description_fr + rowNumber]?.v ?? null;
                row.warning.en = sheet[attributesColumns.warning_en + rowNumber]?.v ?? null;
                row.warning.fr = sheet[attributesColumns.warning_fr + rowNumber]?.v ?? null;
                row.unit = sheet[attributesColumns.unit + rowNumber]?.v ?? null;
                row.is_static = (sheet[attributesColumns.is_static + rowNumber]?.v ?? null);


                for (const fyCol in fiscalYears) {
                    const fiscalYear = fiscalYears[fyCol];
                    row.fiscalYears[fiscalYear] = sheet[fyCol + rowNumber]?.v ?? null;
                }

                rows.push(row);

            }

            return rows;

        },

        inputs() {
            return this.rows.filter(row => row.type === 'input');
        },

        outputs() {
            return this.rows.filter(row => row.type === 'outputs');
        },

        backend() {
            let groups = {};
            this.rows.filter(row => row.type === 'backend').forEach(row => {
                if (groups[row.groupName.en]) {
                    groups[row.groupName.en].rows.push(row);
                } else {
                    groups[row.groupName.en] = {
                        rows: [row],
                        label: row.groupName
                    }
                }
            });
            return groups;
        }


    },

    actions: {

        async readWorkbook(file) {
            let arrayBuffer;
            if (file) {
                arrayBuffer = await file.arrayBuffer();
            } else {
                arrayBuffer = await (await fetch(worksheetUrl)).arrayBuffer();
            }

            const workbook = read(arrayBuffer);
            this.workbook = workbook;
        },

        instanciateUserValues() {

            let userValues = {};

            this.inputs.forEach(input => {
                userValues[input.id] = {};
                for (const fy in input.fiscalYears) {
                    userValues[input.id][fy] = { value: 0 };
                }
            });

            this.userValues = userValues;

        },

        updateSheet(workbook) {

            // Update the sheet with the user values
            for (const inputRowId in this.userValues) {

                const rowForInput = this.rows.find(row => row.id === inputRowId);

                for (const fy in this.userValues[inputRowId]) {
                    const userValue = this.userValues[inputRowId][fy].value;
                    const columnForFiscalYear = Object.keys(this.fiscalYears).find(col => this.fiscalYears[col] === fy);
                    const cellPath = columnForFiscalYear + rowForInput.row;

                    this.workbook.Sheets[MACHINE_READABLE_SHEET_NAME][cellPath].v = userValue;
                }

            }

            XLSX_CALC(this.workbook);
        },

        async loadWorkbook(file) {
            this.loading = true;
            this.error = null;

            try {
                await this.readWorkbook(file);
            } catch (error) {
                this.loading = false;
                this.error = error;
                return;
            }

            this.instanciateUserValues();
            this.loading = false;


        }


    }
})