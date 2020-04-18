<template>
    <div class="ImageEditionScreen">
            <Header :home="false"
                :isContent="true"
                :item="image"
                :saveItem="saveItem"
                :deleteItem="deleteItem" :key="image.id" :saveButton="saveButton"/>

            <div class="Edition">
                <div>
                    <p>Nombre de imagen</p>
                    <input v-model="image.name" type="text" required>
                </div>
                <div>
                    <p>Uri</p>
                    <input v-model="image.uri" type="text" required>
                </div>
            </div>

            <div class="Image"
                :style="{backgroundImage : `url('${image.url}')`  }" />
    </div>
</template>

<script>
import {  Header } from '@/components'
import api from '@/utils/api'
import utils from '@/utils/utils'
import url from 'url'
import axios from 'axios'

export default {
    name: 'ImageEditionScreen',
    components: {
        Header,
    },
    data () {
        return {
            image: {
                id: 0
            },
            toastOptions: {
                position: 'top-center',
                duration: 3000
            },
            saveButton: false,
            defaultImage: '/static/images/default.jpg'
        }
    },
     watch: {
        image: {
            deep: true,
            handler() {
                this.saveButton = true;
                this.image.url = !utils.isRemoteImage(this.image.uri) ? 
                    axios.defaults.baseURL + this.image.uri : this.image.uri;
            }
        }
    },
    methods: {
        handleClickItem(param) {
            this.image.contents.push(param)
        },
        async fetchResult (imageId) {
            if (this.imageId || imageId) {
                this.image = await api.getImage(this.imageId || imageId);

                this.image.uri = this.image.uri ? this.image.uri : this.defaultImage;
                this.image.url = !utils.isRemoteImage(this.image.uri) ? 
                    axios.defaults.baseURL + this.image.uri : this.image.uri;
            }
        },
        async saveItem (image) {
            try {
                const message = `Imagen ${this.imageId ? 'actualizada' : 'creada'} correctamente`,
                    defaultUrl = url.parse(this.defaultImage);
                let newImage;

                image.uri = image.uri ? image.uri : defaultUrl.path;
                
                if (this.imageId) {
                    newImage = await api.updateImage(this.imageId, image);
                } else {
                    newImage = await api.createImage(image);
                }
                
                this.image.id = newImage.id;
                await this.fetchResult(newImage.id)

                this.saveButton = false;
                
                this.$toasted.success(message, this.toastOptions);
            } catch(err) {
                const message = `Error ${this.imageId ? 'actualizando' : 'creando'} ` +
                    `la imagen. [err=${err && err.toString()}]`;
                this.$toasted.error(message, this.toastOptions);
            }
        },
        async deleteItem (image) {
            try {
                await api.deleteImage(image && image.id);
                this.saveButton = false;
                this.$router.push('/')
            } catch(err) {
                const message = `Error eliminando la imagen. [err=${err && err.toString()}]`;
                this.$toasted.error(message, this.toastOptions);
            }
        }
        
    },
    async mounted () {
        await this.fetchResult()
        this.saveButton = false;
    },
    computed: {
        imageId() {
            return this.$router.history.current.params.id
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/theme/_variables.scss";

.ImageEditionScreen {
    width: 100%;
    z-index: 1;

    .Title {
        padding: 20px 50px;
        .TitleChild {
            display: inline-block;
            margin-right: 15px;
        }
        .TitleChildIcon{
            display: inline-block;
            cursor: pointer;
        }
    }
    .Edition {
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
        input:focus{
            outline: none;
        }
        p{
            padding: 10px;
        }
    }
    .Image{
        margin-left: 50px;
        width: 600px;
        height: 300px;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
</style>
