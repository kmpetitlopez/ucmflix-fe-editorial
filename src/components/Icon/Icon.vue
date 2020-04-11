<template>
    <i
        :class="iconClass"
        :style="iconStyles"
        class="Icon"
        @click="$emit('click')"
    />
</template>

<script>
import VueTypes from 'vue-types'

const colors = ['white', 'primary', 'secondary', 'dark', 'grayMedium', 'black', 'yellow', 'red', 'green', 'blue']
export default {
    name: 'Icon',
    props: {
        icon: VueTypes.string.isRequired.def(''),
        color: VueTypes.oneOf(colors).def('dark'),
        size: VueTypes.number.def(0),
        clickable: VueTypes.bool.def(false),
    },
    data () {
        return {}
    },
    computed: {
        iconClass () {
            return [
                [
                    `icon-${this.icon}`,
                    this.color,
                    this.clickable ? 'clickable' : '',
                ],
            ]
        },
        iconStyles () {
            const styles = {}
            if (this.size) styles.fontSize = `${this.size}px`
            return styles
        },
    },
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.Icon {
    vertical-align: middle;
    color: $gray-01;
    transition: all .3s ease-in-out;
    &.white {
        color: $white;
    }
    &.primary {
        color: $primary;
    }
    &.secondary {
        color: $secondary;
    }
    &.black {
        color: $black;
    }
    &.dark {
        color: $gray-01;
    }
    &.grayMedium {
        color: $gray-medium;
	}
    &.yellow {
        color: $warning;
    }
	&.red {
		color: $danger;
    }
    &.green {
        color: $success;
    }
    &.blue {
        color: $info;
    }
    &.clickable {
        cursor: pointer;
        &:hover{
            opacity: 0.5;
        }
    }
}
</style>
