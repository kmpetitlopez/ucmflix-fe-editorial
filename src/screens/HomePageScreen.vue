<template>
    <div class="HomepageScreen">
        <Header2 />

        <div class="Content">
            <div class="Section">
                <div class="SectionTitle">
                    <h2 class="SectionTitleChild">
                        Contenido sin categoría
                    </h2>
                </div>
                
                <div class="SliderSection">
                    <Slider :contents="contentWithoutCategory"/>
                </div>
            </div>
            <div class="Section" v-for="(category, i) in categories" :key="i" >
                <div class="SectionTitle">
                    <h2 @click="handleSectionRedirect(category.id)" class="SectionTitleChild">
                        {{category.name}}
                    </h2>
                    <p class="SectionTitleChild">
                        {{category.startDate}} {{category.endDate ? ('- ' + category.endDate) : '' }}
                    </p>
                    <Status :item="category" class="SectionTitleChild"/>
                </div>
                
                <div class="SliderSection">
                    <Slider :contents="category.contents"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Slider, Header2, Status } from '@/components'
import utils from '@/utils/utils'

export default {
    name: 'HomepageScreen',
    components: {
        Slider,
        Header2,
        Status
    },
    data () {
        return {
            categories: [],
            contentWithoutCategory: []
        }
    },
    methods: {
        handleSectionRedirect (param) {
            this.$router.push({ name: 'section', params: { id: param } })
        },
        async fetchResult () {
            this.contentWithoutCategory = await utils.getContentWithoutCategories();
            this.categories = await utils.getHomeScreenInfo();
        }
    },
    mounted () {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
        } else {
            this.fetchResult()
        }
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
