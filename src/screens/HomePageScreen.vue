<template>
    <div class="HomepageScreen">
        <Header />

        <div class="Content">
            <div class="Section" v-for="(category, i) in categories" :key="i" >
                <div class="SectionTitle">
                    <h2 @click="handleSectionRedirect(category.id)" class="SectionTitleChild">
                        {{category.name}}
                    </h2>
                    <p class="SectionTitleChild">
                        {{category.startDate}} {{category.endDate ? ('- ' + category.endDate) : '' }}
                    </p>
                    <Icon icon="eye-off" :size="20" v-if="category.status === 'expired'" class="SectionTitleChild"/>
                    <Icon icon="eye" :size="20" v-if="category.status === 'active'" class="SectionTitleChild"/>
                    <Icon icon="clock" :size="20" v-if="category.status === 'programmed'" class="SectionTitleChild"/>
                </div>
                
                <div class="SliderSection">
                    <Slider :contents="category.contents"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Slider, Header, Icon } from '@/components'
import utils from '@/utils/utils'

export default {
    name: 'HomepageScreen',
    components: {
        Slider,
        Header,
        Icon
    },
    data () {
        return {
            categories: []
        }
    },
    methods: {
        handleSectionRedirect (param) {
            this.$router.push({ name: 'section', params: { id: param } })
        },
        async fetchResult () {
            this.categories = await utils.getHomeScreenInfo()
        }
    },
    mounted () {
        this.fetchResult()
    }
}
</script>
<style lang="scss" scoped>
@import "@/theme/_variables.scss";

.HomepageScreen {
    width: 100%;
    .Content {
        z-index: 1;
        .Section {
            .SectionTitle {
                margin-left: 60px;
                margin-top: 25px;
                h2{
                    color: $body-color;
                    font-size: 35px;
                    cursor: pointer;
                }
                .SectionTitleChild{
                    display: inline-block;
                    margin-right: 10px;
                }
            }
            .SliderSection {
                width: 100%;
            }
        }  
    } 
}
</style>
