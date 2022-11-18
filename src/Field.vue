<template>
    <input :class="classes" type="number" step="1" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" :readonly="readonly" />
</template>
<script>
export default {
    props: ['modelValue', 'readonly'],
    emits: ['update:modelValue'],
    computed: {
        classes() {
            let classes = ['w-full', 'text-right', 'px-2', 'py-1', 'border-2', 'font-semibold', 'rounded'];

            if (this.readonly !== undefined && this.readonly !== false) {
                classes = classes.concat(['border-gray-300', 'dark:border-gray-700', 'outline-none', 'text-gray-800', 'dark:text-gray-200']);
            } else {
                classes = classes.concat(['border-blue-800', 'dark:border-blue-200', 'hover:border-blue-700', 'dark:hover-border-blue-300', 'text-blue-800', 'dark:text-blue-200', 'outline-blue-600', 'dark:outline-blue-400', 'outline-offset-1']);
            }
            return classes.join(" ");
        }
    }
}
</script>
