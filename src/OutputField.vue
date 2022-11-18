<template>
    <input
        class="w-full text-right px-2 py-1 border-2 font-semibold border-gray-300 dark:border-gray-700 outline-none rounded text-gray-800 dark:text-gray-200 "
        type="number" step="1" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" readonly />
</template>
<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue']
}
</script>
