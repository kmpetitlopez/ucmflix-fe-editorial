<template>
    <div class="Parent">
        <Icon icon="x-circle" :size="20" v-if="item.status === constants.STATUS.expired"/>
        <Icon icon="tv" :size="20" v-if="item.status === constants.STATUS.active"/>
        <Icon icon="clock" :size="20" v-if="item.status === constants.STATUS.programmed"/>
    </div>
</template>

<script>
import VueTypes from 'vue-types';
import {Icon} from '@/components';
import constants from '@/utils/constants';

export default {
    name: 'Status',
    props: {
        item: VueTypes.object.isRequired,
    },
    components: {
        Icon
    },
    created: function () {
        this.constants = constants.getConstants();
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

</style>
