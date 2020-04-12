<template>
    <div class="Parent">
        <Icon icon="x-circle" :size="20" v-if="item.status === 'expired'"/>
        <Icon icon="tv" :size="20" v-if="item.status === 'active'"/>
        <Icon icon="clock" :size="20" v-if="item.status === 'programmed'"/>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import {Icon} from '@/components';

export default {
    name: 'Status',
    props: {
        item: VueTypes.object.isRequired,
    },
    components: {
        Icon
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

</style>
