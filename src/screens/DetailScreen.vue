<template>
    <div class="ContentContainer">
        <div class="Wrapper">
            <Header :home="false"
                :isContent="true"
                :item="content"
                :saveItem="saveItem"
                :deleteItem="deleteItem"/>

            <DetailEdition :content="content"/>
            
            <div class="ExternalSection">
                <div class="ExternalSectionChild">
                    <DetailHeader :filters="filtersCategory"
                        :filter="filterCategories"
                        title="Categorías"/>
                    <div class="CategoryBox">
                        <div v-for="(category) in filteredCategories" :key="category.name" class="CategoryItem">
                            <Icon icon="check-square" :size="20" v-if="category.selected" class="CategoryItemChildSelected"
                                :clickable="true" @click="selectCategory(category)"
                            />
                            <Icon icon="square" :size="20" v-if="!category.selected" class="CategoryItemChild"
                                :clickable="true" @click="selectCategory(category)"
                            />
                            <p class="CategoryItemChild">{{category.fullName}}</p>
                            <Status :item="category" class="CategoryItemChild"/>
                        </div>
                    </div>
                </div>
                <div class="ExternalSectionChild">
                    <DetailHeader :filters="filtersVodEvent"
                        :filter="filterVodEvents"
                        title="Eventos"/>
                    <div class="VodEventBox">
                        <div v-for="(vodEvent, i) in filteredVodEvents" :key="i" class="VodEventItem">
                            <Icon icon="check-square" :size="20" v-if="vodEvent.selected" class="CategoryItemChildSelected"
                                :clickable="true" />
                            <Icon icon="square" :size="20" v-if="!vodEvent.selected" class="VodEventItemChild"
                                :clickable="true" />
                            <date-pick v-model="vodEvent.windowStartTime" class="DatePicker" :editable="vodEvent.editable"></date-pick>
                            <date-pick v-model="vodEvent.windowStartTime" class="DatePicker" :editable="vodEvent.editable"></date-pick>
                            <Status :item="vodEvent" class="VodEventItemChild"/>
                        </div>
                    </div>
                </div>
                <div class="ExternalSectionChild">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DetailHeader,DetailEdition, Header, Icon, Status } from '@/components'
import utils from '@/utils/utils'
import api from '@/utils/api'
//import moment from 'moment'
import DatePick from 'vue-date-pick';
import "@/theme/DataPicker.css";

export default {
    name: 'DetailScreen',
    components: {
        DetailHeader,
        DetailEdition,
        Header,
        Icon,
        Status,
        DatePick
    },
    computed: {
        contentId () {
            return this.$router.history.current.params.id
        }
    },
    data () {
        return {
            content: {},
            categories: [],
            filteredCategories: [],
            contentCategories: [],
            contentVodEvents: [],
            filteredVodEvents: [],
            filtersCategory: {
                select: false,
                active: false,
                programmed: false
            },
            filtersVodEvent: {
                select: false,
                active: false,
                programmed: false
            },
            contentTypes: [{
                option: 'Película',
                value: 'movie'
            },
            {
                option: 'Serie',
                value: 'master'
            },
            {
                option: 'Episodio',
                value: 'episode'
            },
            {
                option: 'Especial',
                value: 'special'
            }],
            parentalRatings: [
               'SC',
                'TP',
                'Infantil',
                '+7',
                '+10',
                '+12',
                '+13',
                '+16',
                '+18',
                'X'
            ]
        }
    },
    methods: {
        async fetchResult () {
            if (this.contentId) {
                this.content = await utils.getDetailScreenInfo(this.contentId);
                this.contentCategories = (await api.getContentCategories(this.contentId)).items;
                this.contentVodEvents = await utils.getContentVodEvents(this.contentId);
            }

            this.categories = (await utils.searchCategory('')).map((category) => {
                const isInContent = this.contentCategories.find((ref) => {
                    return category.id === ref.categoryId;
                });

                category.fullName = category.name + ' | ' + category.id;
                category.selected = !!isInContent;

                return category;
            });

            this.filteredCategories = this.categories;
            this.filteredVodEvents = this.contentVodEvents;
        },
        async saveItem (content) {
            console.log(content)
        },
        async deleteItem (content) {
            console.log(content)
        },
        selectCategory (category) {
            category.selected = !category.selected ? true : false;
            category.name += '.';
        },
        filterCategories (filter) {
            console.log(filter)
            this.filtersCategory[filter] = !this.filtersCategory[filter];

            const filtersDeactivated = !this.filtersCategory.select &&
                 !this.filtersCategory.active &&  !this.filtersCategory.programmed;
                
            this.filteredCategories = utils.filter(
                filtersDeactivated, this.filtersCategory,
                this.filteredCategories, this.categories)
        },
        filterVodEvents (filter) {
            this.filtersVodEvent[filter] = !this.filtersVodEvent[filter];

            const filtersDeactivated = !this.filtersVodEvent.select &&
                 !this.filtersVodEvent.active &&  !this.filtersVodEvent.programmed;
                
            this.filteredVodEvents = utils.filter(
                filtersDeactivated, this.filtersVodEvent,
                this.filteredVodEvents, this.contentVodEvents)
        }
    },
    async mounted () {
        await this.fetchResult()
    },
}
</script>
<style lang="scss" scoped>
@import "@/theme/_variables.scss";

.ContentContainer {
    width: 100%;

    .Wrapper { 
        z-index: 1;
        .Title {
            padding: 20px 50px;
        } 
        .ExternalSection {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            margin: 0px 60px;
            grid-row-gap: 30px;
            grid-column-gap: 30px;
            .ExternalSectionChild {
                height: 450px;
                .CategoryBox {
                    border: 1px solid $black-light;
                    border-radius: 4px;
                    height: 400px;
                    overflow-y: scroll;
                    .CategoryItem{
                        height: 40px;
                        .CategoryItemChild{
                            display: inline-block;
                            margin-left: 10px;
                        }
                        .CategoryItemChildSelected {
                            display: inline-block;
                            margin-left: 10px;
                            color:$success
                        }
                        p {
                            margin-top: 10px;
                        }
                    }
                }
                .VodEventBox {
                    height: 400px;
                    overflow-y: scroll;
                    border: 1px solid $black-light;
                    border-radius: 4px;
                    
                    .VodEventItem{
                        height: 40px;
                        .VodEventItemChild{
                            display: inline-block;
                            margin-left: 10px;
                        }
                        .DatePicker{
                            display: inline-block;
                            margin-left: 10px;
                            margin-top: 10px;
                            border: 1px solid $gray-04;
                            border-radius: 4px;
                            background: transparent;
                            padding: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>
