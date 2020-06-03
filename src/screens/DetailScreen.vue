<template>
    <div class="ContentContainer">
        <div class="Wrapper">
            <Header :home="false"
                :isContent="true"
                :item="content"
                :saveItem="saveItem"
                :deleteItem="deleteItem" :key="content.id" :saveButton="saveButton"
            />

            <DetailEdition :content="content"/>
            
            <div class="ExternalSection">
                <div class="ExternalSectionChild">
                    <DetailHeader :filters="filtersCategory" :filter="filterCategories" title="Categorías"/>
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
                    <DetailHeader :filters="filtersVodEvent" :filter="filterVodEvents" title="Eventos"
                        :extra="true" :deleteSelected="deleteVodEvents" :add="addVodEvents"/>
                    <div class="VodEventBox">
                        <div v-for="(vodEvent) in filteredVodEvents" :key="vodEvent.name" class="VodEventItem">
                            <Icon icon="check-square" :size="20" v-if="vodEvent.selected" class="VodEventItemChildSelected"
                                :clickable="true"  @click="selectVodEvent(vodEvent)"/>
                            <Icon icon="square" :size="20" v-if="!vodEvent.selected" class="VodEventItemChild"
                                :clickable="true" @click="selectVodEvent(vodEvent)"/>
                            <date-pick v-model="vodEvent.windowStartTime" class="DatePicker" :editable="vodEvent.editable"></date-pick>
                            <date-pick v-model="vodEvent.windowEndTime" class="DatePicker" :editable="vodEvent.editable"></date-pick>
                            <Status :item="vodEvent" class="VodEventItemChild"/>
                        </div>
                    </div>
                </div>
                <div class="ExternalSectionChild">
                    <DetailHeader :filters="filtersVodEvent" :filter="filterVodEvents" title="Imagen" :search="true"
                        :handleClickItem="handleClickItem"/>
                    <div class="Image"  :style="{backgroundImage : `url('${content.imageUrl}')`}" />
                </div>
            </div>

            <div class="EpisodeSection" v-for="(season, i) in seasons" :key="i">
                <h3 class="SectionTitle">Temporada {{ season.seasonNumber }}</h3>
                <div class="SliderSection">
                    <Slider :contents="season.episodes" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DetailHeader,DetailEdition, Header, Icon, Status, Slider } from '@/components'
import utils from '@/utils/utils'
import api from '@/utils/api'
import constants from '@/utils/constants';
import DatePick from 'vue-date-pick';
import "@/theme/DataPicker.css";
import _ from 'lodash'

export default {
    name: 'DetailScreen',
    components: {
        DetailHeader,
        DetailEdition,
        Header,
        Icon,
        Status,
        DatePick,
        Slider
    },
    computed: {
        contentId() {
            return this.$router.history.current.params.id;
        }
    },
    data () {
        return {
            content: {
                id: 0,
                imageUrl: ''
            },
            categories: [],
            filteredCategories: [],
            contentCategories: [],
            contentVodEvents: [],
            filteredVodEvents: [],
            seasons: [],
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
            toastOptions: {
                position: 'top-center',
                duration: 3000
            },
            saveButton: false,
            originalValues: {
                content: {
                    id: 0,
                    imageUrl: ''
                },
                categories: [],
                vodEvents: []
            }
        }
    },
    watch: {
        content: {
            deep: true,
            handler() {
                this.activateSaveButton();
            }
        },
        contentVodEvents: {
            deep: true,
            handler() {
                this.activateSaveButton();
            }
        },
        categories: {
            deep: true,
            handler() {
                this.activateSaveButton();
            }
        }
    },
    methods: {
        async fetchResult (contentId) {
            if (this.contentId || contentId) {
                this.content = await utils.getDetailScreenInfo(this.contentId || contentId);
                this.contentCategories = (await api.getContentCategories(this.contentId || contentId)).items;
                this.contentVodEvents = await utils.getContentVodEvents(this.contentId || contentId);

                this.originalValues.content = _.clone(this.content);
                this.originalValues.categories = _.clone(this.contentCategories);
                this.originalValues.vodEvents = _.clone(this.contentVodEvents);

                if (this.content.type === this.constants.CONTENT_TYPES.master) {
                    this.seasons = await utils.getMasterSeasons(this.contentId || contentId);
                }
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
        async saveItem () {
            try {
                const categories = this.categories.filter((cat) => cat.selected),
                    newContent = await utils.saveContent(this.content, categories, this.contentVodEvents),
                    message = `Contenido ${this.contentId ? 'actualizado' : 'creado'} correctamente`;
                
                this.content.id = newContent.id;
                await this.fetchResult(newContent.id);
                this.saveButton = false;
                
                this.$toasted.success(message, this.toastOptions);
            } catch(err) {
                const message = `Error ${this.contentId ? 'actualizando' : 'creando'} ` +
                    `el contenido. [err=${err && err.toString()}]`;
                this.$toasted.error(message, this.toastOptions);
            }
        },
        async deleteItem () {
            try {
                await utils.deleteContent(this.content);
                this.saveButton = false;
                this.$router.push('/')
            } catch(err) {
                const message = `Error eliminando el contenido. [err=${err && err.toString()}]`;
                this.$toasted.error(message, this.toastOptions);
            }
        },
        selectCategory (category) {
            category.selected = !category.selected ? true : false;
            category.name += '.';
        },
        selectVodEvent (vodEvent) {
            vodEvent.selected = !vodEvent.selected ? true : false;
            vodEvent.name += '.';
        },
        filterCategories (filter) {
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
        },
        deleteVodEvents () {
            this.contentVodEvents = this.contentVodEvents.filter((vodEvents) => {
                return !vodEvents.selected;
            });
            this.filteredVodEvents = this.contentVodEvents;

            for (const filter in this.filtersVodEvent) {
                this.filtersVodEvent[filter] = false;
            }
        },
        addVodEvents () {
            const newVodEvent = {
                windowStartTime: null,
                windowEndTime: null,
                editable: true,
                selected: false,
                new: true
            };

            this.contentVodEvents.push(newVodEvent);
            this.filteredVodEvents = this.contentVodEvents;

            for (const filter in this.filtersVodEvent) {
                this.filtersVodEvent[filter] = false;
            }
        },
        handleClickItem(image) {
            this.content.imageUrl = utils.getImageUrl(image);
            this.content.imageId = image.id;
        },
        activateSaveButton() {
            const categories = this.categories.filter((cat) => cat.selected),
                categoriesDifferentLength = categories.length !== this.originalValues.categories.length,
                vodEventsDifferentLength = this.contentVodEvents.length !== this.originalValues.vodEvents.length,
                excludeProperties = ['contents', 'updatedAt', 'createdAt', 'fullName', 'hover',
                    'image', 'imageUrl', 'status', 'vodEvents'];

            this.saveButton = false;

            if (categoriesDifferentLength) {
                this.saveButton = true;
            }

            if (vodEventsDifferentLength) {
                this.saveButton = true;
            }

            for (const key in this.originalValues.content) {
                if (Object.prototype.hasOwnProperty.call(this.originalValues.content, key)) {
                    const exclude = excludeProperties.find((ref) => {
                        return ref === key;
                    });

                    if (!exclude && this.originalValues.content[key] != this.content[key]) {
                        this.saveButton = true;
                        break;
                    }
                }
            }

            for (const vodEvent of this.originalValues.vodEvents) {
                const isInVodEvents = this.contentVodEvents.find((ref) => {
                    return vodEvent.id === ref.id;
                });

                if (!isInVodEvents) {
                    this.saveButton = true;
                    break;
                }
            }

            for (const category of this.originalValues.categories) {
                const isInCategories = categories.find((ref) => {
                    return category.categoryId === ref.id;
                });

                if (!isInCategories) {
                    this.saveButton = true;
                    break;
                }
            }
        }
    },
    async mounted () {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
        } else {
            await this.fetchResult()
            this.saveButton = false;
        }
    },
    created: function () {
        this.constants = constants.getConstants();
    }
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
            grid-column-gap: 20px;
            .ExternalSectionChild {
                white-space: nowrap;
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
                            white-space: nowrap;
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
                        white-space: nowrap;
                        .VodEventItemChild{
                            display: inline-block;
                            margin-left: 10px;
                        }
                        .VodEventItemChildSelected{
                            display: inline-block;
                            margin-left: 10px;
                            color:$success
                        }
                        .DatePicker{
                            z-index: 2;
                            width: 120px;
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
                .Image{
                    height: 300px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    margin-top: 10px;
                }
            }
        }

        .EpisodeSection {
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
</style>
