<template>
    <div class="Parent">
        <h2 class="Header">{{title}}</h2>
        <Icon icon="check-square" :size="20" :clickable="true" @click="filter('select')" class="Header"
            :class="{HeaderActive: filters.select}"/>
        <Icon icon="eye" :size="20" :clickable="true" @click="filter('active')" class="Header"
            :class="{HeaderActive: filters.active}"/>
        <Icon icon="clock" :size="20" :clickable="true" @click="filter('programmed')" class="Header"
            :class="{HeaderActive: filters.programmed}"/>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import {Icon} from '@/components';

export default {
    name: 'DetailHeader',
    props: {
        filter: VueTypes.func.isRequired,
        filters: VueTypes.object.isRequired,
        title: VueTypes.string.isRequired
    },
    components: {
        Icon
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.Parent {
    .Header {
        display: inline-block;
        margin-right: 15px;
    }
    .HeaderActive{
        color: $warning
    }
}
</style>
