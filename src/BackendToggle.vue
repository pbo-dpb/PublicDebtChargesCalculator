<template>
    <label class="
                print:hidden
                select-none
                text-sm 
                font-semibold 
                px-4 
                py-2 
                text-blue-900
                dark:text-blue-100 
                
                 
                rounded 
                 flex flex-row 
                 items-center 
                 gap-2
                 group 
                 " :class="{
                     'bg-blue-100 dark:bg-blue-800 ': !modelValue,
                     'bg-blue-200 dark:bg-blue-600 shadow-inner': modelValue,
                 
                 }">
        <input type="checkbox" class="accent-blue-800 group-hover:accent-blue-600 " :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)">
        {{ label }}
    </label>
</template>
<script>
export default {
    props: ['modelValue', 'label'],
    emits: ['update:modelValue']
}
</script>

