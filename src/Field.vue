<template>
    <div class="flex flex-col" :class="{ 'invisible': modelValue === false }">
        <label :for="uuid"
            class="lg:sr-only print:hidden text-[10px] text-center text-gray-700 dark:text-gray-300 font-extralight">{{
                    label
            }}</label>
        <input type="number" :id="uuid" :class="classes" step="1" :value="modelValue === false ? '' : modelValue"
            @input="$emit('update:modelValue', $event.target.value)" :readonly="readonly" v-bind="$attrs" />
    </div>
</template>
<script>
import uniqueId from 'lodash.uniqueid'

export default {
    props: ['modelValue', 'readonly', 'label', 'isStatic'],
    emits: ['update:modelValue'],
    data() {
        return {
            uuid: `pdccfield-${uniqueId()}`
        }
    },
    computed: {
        classes() {
            let classes = ['w-full', 'text-right', 'px-0.5', 'lg:px-2', 'py-1', 'border', 'lg:border-2', 'print:border-0', 'font-thin', 'lg:font-semibold', 'rounded', 'text-xs', 'lg:text-base'];

            if (this.readonly !== undefined && this.readonly !== false) {
                classes = classes.concat(['border-gray-300', 'dark:border-gray-700', 'outline-none', 'dark:bg-gray-800']);
                if (this.isStatic) {
                    classes = classes.concat(['bg-gray-100', 'text-gray-600', 'dark:text-gray-300'])
                } else {
                    classes = classes.concat(['text-gray-800', 'dark:text-white'])
                }
            } else {
                classes = classes.concat(['dark:bg-blue-900', 'border-blue-800', 'dark:border-blue-200', 'hover:border-blue-700', 'dark:hover-border-blue-300', 'text-blue-800', 'dark:text-blue-200', 'outline-blue-600', 'dark:outline-blue-400', 'outline-offset-1']);
            }

            return classes.join(" ");
        }
    }
}
</script>
