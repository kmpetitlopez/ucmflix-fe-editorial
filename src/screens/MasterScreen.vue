<template>
    <div class="MasterScreen">
        <div class="Wrapper">
            <Header :title="master.title" />

            <div class="Content">
                <div class="Section" v-for="(season, i) in seasons" :key="i">
                    <h2 class="SectionTitle">Temporada {{ season.seasonNumber }}</h2>
                    <div class="SliderSection">
                        <Slider :contents="season.episodes" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Slider, Header} from '@/components';
import utils from '@/utils/utils';

export default {
    name: 'HomepageScreen',
    components: {
        Slider,
        Header
    },
    data() {
        return {
            seasons: [],
            master: {}
        };
    },
    methods: {
        handleSectionRedirect(param) {
            this.$router.push({name: 'section', params: {id: param}});
        },
        async fetchResult() {
            this.seasons = await utils.getMasterSeasons(this.sectionID);
            this.master = await utils.getDetailScreenInfo(this.sectionID);
        },
        onHoverEnter(content) {
            content.hover = true;
        },
        onHoverLeave(content) {
            content.hover = false;
        },
        prueba(a) {
            console.log(a);
        }
    },
    mounted() {
        this.fetchResult();
    },
    computed: {
        sectionID() {
            return this.$router.history.current.params.id;
        }
    }
};
</script>
<style lang="scss" scoped>
@import '@/theme/_variables.scss';

.MasterScreen {
    .Wrapper {
        width: 100%;
        

        .Content {
            z-index: 1;
            .Slider {
                .Slides {
                    height: 350px;
                }
                .Icon {
                    background-color: $black-light;
                    border: 1px solid $black-medium;
                    border-radius: 10px;
                    box-shadow: none;
                    transition: 0.3s;
                    width: 15px;
                    height: 15px;
                }
                .Icon--active {
                    background-color: $body-color;
                }
            }
            .Section {
                .SectionTitle {
                    margin-left: 60px;
                    margin-top: 25px;
                    color: $body-color;
                    font-size: 35px;
                    cursor: pointer;
                }
                .SliderSection {
                    width: 100%;
                }
            }
        }
    }
}
img {
    cursor: pointer;
}
</style>
