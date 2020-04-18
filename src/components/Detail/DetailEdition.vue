<template>
    <div class="Edition">
                <div class="Block">
                    <div>
                        <p>Título de contenido</p>
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
                        <p>Duración (min)</p>
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
                        <p>País (ISO 3166-1 alpha-3)</p>
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
</template>

<script>
import VueTypes from 'vue-types'

export default {
    name: 'DetailEdition',
    props: {
        content: VueTypes.object.isRequired
    },
    data () {
        return {
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
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.Edition {
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
            width: 300px;
            border: 1px solid $gray-04;
            border-radius: 4px;
            background: transparent;
            color: $body-color;
            font-size: 15px;
            font-weight: 400;
            transition: border-color 0.5s ease-in-out;
        }
        .Input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        .Input:focus{
            outline: none;
        }
        input{
            height: 25px;
        }
        .BigInput{
            padding: 0px 5px;
            min-height: 50px;
            width: 300px;
            border: 1px solid $gray-04;
            border-radius: 4px;
            background: transparent;
            color: $body-color;
            font-size: 15px;
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
</style>
