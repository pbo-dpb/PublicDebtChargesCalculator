<template>
    <input
        class="w-full text-right px-2 py-1 border-2 font-semibold border-blue-800 dark:border-blue-200 hover:border-blue-700 dark:hover-border-blue-300 rounded text-blue-800 dark:text-blue-200 outline-blue-600 dark:outline-blue-400 outline-offset-1"
        type="number" step="1" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue']
}
</script>
