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
                    <div class="flex">
                        <p>Descripción</p>
                        <textarea rows="4" cols="50" v-model="content.description" class="BigInput"></textarea>
                    </div>
                </div>
                <div class="Block">
                    <div>
                        <p>Asset</p>
                        <input v-model="content.asset" type="text" class="Input">
                    </div>
                    <div v-if="content.type === constants.CONTENT_TYPES.episode">
                        <p>Serie Id</p>
                        <input v-model="content.masterId" type="number" class="Input">
                    </div>
                    <div v-if="content.type === constants.CONTENT_TYPES.episode">
                        <p>#Episodio</p>
                        <input v-model="content.episodeNumber" type="number" class="Input">
                    </div>
                    <div v-if="content.type === constants.CONTENT_TYPES.episode">
                        <p>#Temporada</p>
                        <input v-model="content.seasonNumber" type="number" class="Input">
                    </div>
                </div>
            </div>
</template>

<script>
import VueTypes from 'vue-types';
import constants from '@/utils/constants';

export default {
    name: 'DetailEdition',
    props: {
        content: VueTypes.object.isRequired
    },
    created: function () {
        this.constants = constants.getConstants();
        this.contentTypes = constants.getContentTypeOptions();
        this.parentalRatings = this.constants.PARENTAL_RATINGS;
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.Edition {
    padding: 50px;
    .Block {
        display: flex;
        align-items: flex-end;
        height: fit-content;
        justify-content: space-between;
        div{
            width: 300px;
            padding: 20px 10px;
            display: inline-block;
        }
        .Input{
            padding: 5px 10px;
            width: 300px;
            height: 25px;
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
        select {
            height: 35px !important;
            padding: 5px !important;
        }
        .BigInput{
            padding: 10px;
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
