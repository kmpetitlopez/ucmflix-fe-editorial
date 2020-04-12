<template>
    <div class="ImageGridScreen">
            <Header :home="false"/>

            <div class="ImagesContainer">
                <div
                    class="Images"
                    v-for="(image, i) in images"
                    :key="i"
                    :style="{backgroundImage : `url('${image.url}')`  }"
                    @click="handleClickOnImage(image)"
                >
                    <div class="ImagesText">
                        <div>{{image.name}} | {{image.uri}}</div>
                    </div>
                    
                </div>

            </div>
    </div>
</template>

<script>
import {  Header } from '@/components'
import api from '@/utils/api'
import utils from '@/utils/utils'
import axios from 'axios'

export default {
    name: 'ImageGridScreen',
    components: {
        Header,
    },
    data () {
        return {
            images: [],
            defaultImage: '/static/images/default.jpg'
        }
    },
    methods: {
        handleClickOnImage (param) {
            this.$router.push({ name: 'image', params: { id: param.id } })
        },
        async fetchResult () {
            this.images = (await api.getImages()).items;

            for (const image of this.images) {
                image.uri = image.uri ? image.uri : this.defaultImage;
                image.url = !utils.isRemoteImage(image.uri) ? 
                    axios.defaults.baseURL + image.uri : image.uri;
            }
        }
    },
    async mounted () {
        await this.fetchResult()
    }
}
</script>
<style lang="scss" scoped>
@import "@/theme/_variables.scss";

.ImageGridScreen {
    width: 100%;
    z-index: 1;

    .ImagesContainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        margin: 0px 60px;
        grid-row-gap: 30px;
        grid-column-gap: 30px;

        .Images {
            position: relative;
            height: 200px;
            background-size: cover;
            background-repeat: no-repeat;
            cursor: pointer;
            background-color: $black-light;
            border: 1px solid $black-medium;
            .ImagesText{
                background-color: $black-light;
                position: absolute;
                bottom: 0px;
                width: 100%;
                padding: 5px 2px;
            }
        }
    }
}
</style>
