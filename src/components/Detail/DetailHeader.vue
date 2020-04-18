<template>
    <div class="Parent">
        <h2 class="Header">{{title}}</h2>
        <Icon icon="check-square" :size="20" :clickable="true" @click="filter('select')" class="Header"
            :class="{HeaderActive: filters.select}" v-if="!search"/>
        <Icon icon="tv" :size="20" :clickable="true" @click="filter('active')" class="Header"
            :class="{HeaderActive: filters.active}" v-if="!search"/>
        <Icon icon="clock" :size="20" :clickable="true" @click="filter('programmed')" class="Header"
            :class="{HeaderActive: filters.programmed}" v-if="!search"/>
        <Icon icon="trash1" :size="20" :clickable="true" @click="deleteSelected()" class="Header"  v-if="extra"/>
        <Icon icon="plus" :size="20" :clickable="true" @click="add()" class="Header"  v-if="extra"/>
        <Input
            class="Header"
            v-model="value"
            name="search"
            type="search"
            placeholder="Buscar imagen..."
            iconLeft="search"
            :width="350"
            :handleClick="handleClickItem"
            entityType="image"
            v-if="search"
        />
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import {Icon, Input} from '@/components';

export default {
    name: 'DetailHeader',
    props: {
        filter: VueTypes.func.def(() => {}),
        deleteSelected: VueTypes.func.def(() => {}),
        add: VueTypes.func.def(() => {}),
        filters: VueTypes.object.def({}),
        title: VueTypes.string.isRequired,
        extra: VueTypes.bool.def(false),
        search:  VueTypes.bool.def(false),
        handleClickItem: VueTypes.func.def(() => {})
    },
    components: {
        Icon,
        Input
    },
    data() {
        return {
            value: undefined
        };
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.Parent {
    position: sticky;
    z-index: 2;
    .Header {
        display: inline-block;
        margin-right: 15px;
    }
    .HeaderActive{
        color: $warning
    }
}
</style>
