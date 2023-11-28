<template>
    <component :is="'button'" class="rounded px-4 py-2 font-bold" :class="buttonClasses" type="button" @click="click"
        :disabled="loading || disabled" :active="active ? true : null">
        <div class="flex flex-row items-center gap-2 justify-center" v-show="!loading">
            <slot></slot>
        </div>

        <span color="text-white" v-if="loading">
            <loading-indicator class="h-6 w-6"></loading-indicator>
        </span>
    </component>
</template>
  
<script>
import LoadingIndicator from "./LoadingIndicator.vue";
export default {
    emits: ["click"],
    inheritAttrs: false,
    components: { LoadingIndicator },
    props: {

        /**
         * The type of button. This affects the color and the hover color.
         * Possible values are `primary`, `positive`, `negative`, and `default`.
         */
        type: {
            type: String,
            validator: function (value) {
                return (
                    ["primary", "positive", "negative", "default"].indexOf(
                        value
                    ) !== -1
                );
            },
            default: "default",
        },

        /**
         * Whether the action the button trigger is in progress or not.
         */
        loading: {
            type: Boolean,
            default: false,
        },

        /**
         * Whether the button is disabled or not.
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * An array of classes to apply to the button.
         */
        classes: {
            type: Array,
            default: function () {
                return [];
            },
        },

        /**
         * Whether the button is active or not.
         */
        active: {
            type: Boolean,
            default: false,
        },
        /**
         * An optional URL. When this is provided, the button acts as a link.
         */
        href: {
            type: String,
        },

        /**
         * An optional target for the link. Only used when `href` is provided.
         */
        target: {
            type: String,
        },
    },
    computed: {
        buttonClasses() {
            let base = ["text-white", ...this.classes];


            if (this.loading || this.disabled) {
                base.push(this.colors.disabled);
                if (this.loading) {
                    base.push("cursor-wait");
                }
                if (this.disabled) {
                    base.push("cursor-default");
                }
            } else if (this.active) {
                base.push(this.colors.active);
                base.push("shadow-inner");
            } else {
                base.push(this.colors.base);
                base.push(this.colors.hover);
                base.push('transition-all hover:shadow-lg')
            }
            return base;
        },

        colors() {
            switch (this.type) {
                case "primary":
                    return {
                        disabled: "bg-blue-500",
                        base: "bg-blue-800",
                        hover: "hover:bg-blue-700",
                        active: "bg-blue-900",
                    };
                case "positive":
                    return {
                        disabled: "bg-green-500",
                        base: "bg-green-800",
                        hover: "hover:bg-green-700",
                        active: "bg-green-900",
                    };
                case "negative":
                    return {
                        disabled: "bg-red-500",
                        base: "bg-red-800",
                        hover: "hover:bg-red-700",
                        active: "bg-red-900",
                    };
            }
            return {
                disabled: "bg-gray-500",
                base: "bg-gray-900",
                hover: "hover:bg-gray-700",
                active: "bg-gray-900",
            };
        },
    },
    methods: {
        click(e) {
            if (this.href && this.target) {
                window.open(this.href, this.target);
            } else if (this.href) {
                window.location.href = this.href;
            } else {
                this.$emit("click", e);
            }
        },
    },
};
</script>
  
  