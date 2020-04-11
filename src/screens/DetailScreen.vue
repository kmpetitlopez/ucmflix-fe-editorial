<template>
    <div class="ContentContainer">
        <div class="Wrapper">
            <Header :home="false"
                :isContent="true"
                :item="content"
                :handleClickItem="handleClickItem"
                :saveItem="saveItem"
                :deleteItem="deleteItem"/>

            <div class="Information">
                <div class="Block">
                    <div>
                        <p>Título</p>
                        <input v-model="content.title" type="text" class="Input">
                    </div>
                    <div>
                        <p>Tipo</p>
                        <select v-model="content.type" class="Input">
                            <option v-for="(type, i) in contentTypes" 
                                :key="i"
                                :value="type.value">{{type.option}}</option>
                        </select>
                    </div>
                    <div>
                        <p>Género</p>
                        <input v-model="content.genre" type="text" class="Input">
                    </div>
                    <div>
                        <p>Duración</p>
                        <input v-model="content.duration" type="number" class="Input">
                    </div>
                </div>
                <div class="Block">
                    <div>
                        <p>Clasificación</p>
                        <select v-model="content.parentalRating" class="Input">
                            <option v-for="(rating, i) in parentalRatings" 
                                :key="i"
                                :value="rating">{{rating}}</option>
                        </select>
                    </div>
                    <div>
                        <p>Año</p>
                        <input v-model="content.year" type="number" class="Input">
                    </div>
                    <div>
                        <p>País</p>
                        <input v-model="content.country" type="text" class="Input">
                    </div>
                    <div>
                        <p>Descripción</p>
                        <textarea rows="4" cols="50" v-model="content.description" class="BigInput"></textarea>
                    </div>
                </div>
                <div class="Block" v-if="content.type === 'episode'">
                    <div>
                        <p>Serie Id</p>
                        <input v-model="content.masterId" type="number" class="Input">
                    </div>
                    <div>
                        <p>#Episodio</p>
                        <input v-model="content.episodeNumber" type="number" class="Input">
                    </div>
                    <div>
                        <p>#Temporada</p>
                        <input v-model="content.seasonNumber" type="number" class="Input">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Header } from '@/components'
import utils from '@/utils/utils'
//import moment from 'moment'
// import DatePick from 'vue-date-pick';
// import "@/theme/DataPicker.css";

export default {
    name: 'DetailScreen',
    components: {
        Header,
        // DatePick
    },
    computed: {
        videoID () {
            return this.$router.history.current.params.id
        }
    },
    data () {
        return {
            content: {},
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
         handleClickItem(param) {
             console.log(param)
            //this.content.contents.push(param)
        },
        async fetchResult () {
            this.content = await utils.getDetailScreenInfo(this.videoID);
        },
        async saveItem (content) {
            console.log(content)
        },
        async deleteItem (content) {
            console.log(content)
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
        .Information {
            padding: 50px;
            .Block {
                div{
                    width: 350px;
                    padding: 20px 10px;
                    height: 50px;
                    display: inline-block;
                }
                .Input{
                    padding: 5px;
                    min-height: 35px;
                    height: 35px;
                    width: 300px;
                    border: 1px solid $gray-04;
                    border-radius: 4px;
                    background: transparent;
                    color: $body-color;
                    font-size: 14px;
                    font-weight: 400;
                    transition: border-color 0.5s ease-in-out;
                }
                .Input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
                .Input:focus{
                    outline: none;
                }
                .BigInput{
                    padding: 0px 5px;
                    min-height: 50px;
                    width: 300px;
                    border: 1px solid $gray-04;
                    border-radius: 4px;
                    background: transparent;
                    color: $body-color;
                    font-size: 14px;
                    font-weight: 400;
                    transition: border-color 0.5s ease-in-out;
                }
                .BigInput:focus{
                    outline: none;
                }
                p{
                    padding: 10px;
                }
            }
        }       
    }
}
</style>
