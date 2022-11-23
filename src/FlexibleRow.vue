<template>

    <div class="flex flex-col lg:grid print:grid gap-1 lg:gap-4 grid-cols-12 items-center p-2 -mx-2" :class="{
        'even:bg-gray-100 dark:even:bg-gray-800': !editable,
        'bg-blue-50 dark:bg-blue-900': editable
    }">

        <div class="w-full col-span-4">
            <slot name="title"></slot>
        </div>

        <div class="col-span-8">
            <div class="grid grid-flow-col gap-1 lg:gap-4">
                <slot name="years"></slot>
            </div>
        </div>

    </div>


</template>
<script>
export default {
    props: ['editable']
}
</script>
