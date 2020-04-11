<template>
    <div
        class="Input" v-click-outside="nameOfCustomEventToCall"
    >
        <Icon
            v-if="iconLeft"
            class="iconLeft"
            :icon="iconLeft"
            :color="iconColor"
            :size="18"
        />
        <input
            v-model="searchString"
            :value="value"
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="disabled"
            :class="inputClass"
            :style="({ 'width': `${width}px` })"
            @input="isTyping = true"
        >
        <ul
            v-if="items.length"
            class="Dropdown"
            :style="({ 'width': `${width}px` })"
        >
            <li
                class="DropdownItem"
                v-for="(content, i) in items"
                :key="i"
                @click="handleClick(content)"
            >
                {{ content.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import Icon from '@/components/Icon/Icon.vue'
import utils from '@/utils/utils'
import _ from 'lodash'

const TYPES = [
    'password',
    'email',
    'search',
]
export default {
    name: 'Input',
    props: {
        name: VueTypes.string.isRequired,
        placeholder: VueTypes.string.def(''),
        readonly: VueTypes.bool.def(false),
        disabled: VueTypes.bool.def(false),
        type: VueTypes.oneOf(TYPES).isRequired,
        align: VueTypes.oneOf(['left', 'right', 'center']).def('left'),
        value: VueTypes.oneOfType([String, Number]),
        iconLeft: VueTypes.string.def(''),
        width: VueTypes.number.def(350),
        iconColor: VueTypes.oneOf([
            'white',
            'primary',
            'secondary',
            'dark',
            'grayMedium',
            'black',
            'yellow',
        ]).def('dark'),
        handleClick: VueTypes.func.isRequired
    },
    data () {
        return {
            isTyping: false,
            searchString: '',
            items: []
        }
    },
    components: {
        Icon
    },
    computed: {
        inputClass () {
            return [this.align]
        },
    },
    methods: {
        async fetchResult (searchString) {
            this.items = await utils.searchContent(searchString);
        },
        nameOfCustomEventToCall () {
            this.items = [];
            this.searchString = '';
        }
    },
    watch: {
        searchString: _.debounce(function() {
            if (this.searchString.length >= 3) {
                this.isTyping = false;
            } else {
                this.items = []
            }
        }, 500),
        isTyping: function(value) {
            if (!value) {
                this.fetchResult(this.searchString);
            }
        }
    },
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

input {
    width: calc(100% - 10px);
    min-height: 35px;
    padding: 0 5px;
    border: none;
    border: 1px solid $gray-04;
    border-radius: 4px;
    background: transparent;
    color: $body-color;
    font-size: 14px;
    font-weight: 400;
    transition: border-color 0.5s ease-in-out;

    &:focus {
        border-color: $gray-02;
        outline: none;
    }
    &[readonly] {
        opacity: 0.5;
        cursor: not-allowed;
	}
	&:disabled {
        background-color: $gray-light;
        cursor: not-allowed;
    }
    &.right {
        text-align: right;
    }
    &.center {
        text-align: center;
    }
    &.left {
        text-align: left;
    }
}

.Input {
    position: relative;
}

.Icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &.iconLeft {
        left: 12px;
        top: 16px;
        ~input {
            padding-left: 40px;
        }
    }
}

.Dropdown {
    position: fixed;
    z-index: 99;
    display: block;
    border: 1px solid $black-light;
    border-radius: 10px;
    background-color: $secondary;
    padding: 0;
    margin: 0;
    border-top: none;

    .DropdownItem {
        display: block;
        min-height: 20px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        padding: 10px 0px 5px 20px;
        border-bottom: 1px solid $black-light;
        cursor: pointer;
        &:last-child {
            padding-bottom: 10px;
        }
    }
}
</style>
