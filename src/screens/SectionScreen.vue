<template>
    <div class="SectionScreen">
        <div class="Wrapper">
            <Header :home="false"
                :isCategory="true"
                :item="category"
                :handleClickItem="handleClickItem"
                :saveItem="saveItem"
                :deleteItem="deleteItem"/>

            <div class="Information">
                <div>
                    <p>Nombre</p>
                    <input v-model="category.name" type="text" required>
                </div>
                <div>
                    <p>Fecha de inicio</p>
                    <date-pick v-model="category.startDate" class="DatePicker"></date-pick>
                </div>
                <div>
                    <p>Fecha de fin</p>
                    <date-pick v-model="category.endDate" class="DatePicker"></date-pick>
                </div>
            </div>

            <div class="Title">
                <h2>Contenidos</h2>
            </div>
            <div class="MoviesContainer">
                <div
                    class="Movies"
                    v-for="(content, i) in category.contents"
                    :key="i"
                    :style="{backgroundImage : !content.hover ? '' : `url('${content.imageUrl}'), url('${content.defaultImage}')`  }"
                    @click="handleClickOnImage(content)"
                    v-on:mouseover="onHoverEnter(content)"
                    v-on:mouseleave="onHoverLeave(content)"
                >
                    <template  v-if="!content.hover">
                        <div class="Movies--text" >
                            <h2>{{ content.title }}</h2>
                            <h4>{{ content.genre || 'Entretenimiento/Otros'}}</h4>
                            <p>{{ content.description || '...'}}</p>
                            <footer>
                                <span>{{content.year || '-'}}</span>
                                <span>{{content.country || '-'}}</span>
                                <span>{{content.duration + 'min' || '-'}}</span>
                                <span>{{content.parentalRating || '-'}}</span>
                            </footer>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Header } from '@/components'
import utils from '@/utils/utils'
import moment from 'moment'
import DatePick from 'vue-date-pick';
import "@/theme/DataPicker.css";

export default {
    name: 'SectionScreen',
    components: {
        Header,
        DatePick
    },
    data () {
        return {
            category: {
                contents: []
            }
        }
    },
    methods: {
        handleClickItem(param) {
            this.category.contents.push(param)
        },
        handleClickOnImage (param) {
            const name =  param.type === 'master' ? 'master' : 'detail';
            this.$router.push({ name, params: { id: param.id } })
        },
        async fetchResult () {
            if (this.sectionID) {
                this.category = await utils.getSectionScreenInfo(this.sectionID);
                this.category.startDate = this.category.startDate ?
                    moment.utc(this.category.startDate).format('YYYY-MM-DD') :
                    null;
                this.category.endDate = this.category.endDate ?
                    moment.utc(this.category.endDate).format('YYYY-MM-DD')
                    : null;
                this.contents = this.category.contents;
            }
        },
        onHoverEnter (content) {
            content.hover = true
        },
        onHoverLeave (content) {
            content.hover = false
        },
        async saveItem (category) {
            const newCategory = await utils.saveCategory(category);

            if (this.category.id) {
                this.$router.go(0);
            } else {
                this.$router.push({ name: 'section', params: { id: newCategory.id } });
            }
        },
        async deleteItem (category) {
           await utils.deleteCategory(category);
            this.$router.push('/')
        }
        
    },
    mounted () {
        this.fetchResult()
    },
    computed: {
        sectionID() {
            return this.$router.history.current.params.id
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/theme/_variables.scss";

.SectionScreen {
    width: 100%;

    .Wrapper { 
        z-index: 1;
        .Title {
            padding: 20px 50px;
        }  
        .Information {
            padding: 50px;
            div{
                width: 500px;
                padding: 10px;
                display: inline-block;
            }
            input{
                padding: 5px;
                min-height: 35px;
                width: 300px;
                border: 1px solid $gray-04;
                border-radius: 4px;
                background: transparent;
                color: $body-color;
                font-size: 14px;
                font-weight: 400;
                transition: border-color 0.5s ease-in-out;
            }
            p{
                padding: 10px;
            }
            .DatePicker{
                width: 300px;
                border: 1px solid $gray-04;
                border-radius: 4px;
                background: transparent;
            }
        }       
        .MoviesContainer {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            margin: 0px 60px;
            grid-row-gap: 30px;
            grid-column-gap: 30px;

            .Movies {
                position: relative;
                height: 200px;
                background-size: cover;
                background-repeat: no-repeat;
                cursor: pointer;
                background-color: $black-light;
                border: 1px solid $black-medium;
                .Movies--text{
                    h2 {
                        color: $gray-02;
                        font-weight:bold;
                        padding: 5px 10px 0px 10px;
                    }
                    h4 {
                        color: $gray-02;
                        padding: 0px 10px;
                    }
                    p {
                        color: $gray-04;
                        padding: 0px 5px 5px 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: left;
                        max-height: 70px;
                        line-height: 15px;
                    }
                    footer {
                        color: $gray-04;
                        font-weight:bold;
                        bottom: 10px;
                        position: absolute;
                        span{
                            padding: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
