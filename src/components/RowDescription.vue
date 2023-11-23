<template>
    <div class="prose prose-sm dark:prose-invert border-l-2  pl-2 my-2"
        :class="{ 'border-gray-300 dark:border-gray-700': type === 'default', 'border-yellow-500': type === 'warning' }"
        v-html="renderedDescription"></div>
</template>
<script>
import { marked } from 'marked';
export default {
    props: { "description": String, "type": { type: String, default: "default" } },
    computed: {
        renderedDescription() {
            return marked.parse(this.description)
        }
    }
}
</script>