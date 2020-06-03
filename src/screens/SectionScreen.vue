<template>
    <div class="SectionScreen">
            <Header :home="false"
                :isCategory="true"
                :item="category"
                :handleClickItem="handleClickItem"
                :saveItem="saveItem"
                :deleteItem="deleteItem"
                :key="category.id"
                :saveButton="saveButton"/>

            <div class="Edition">
                <div>
                    <p>Nombre de categoría</p>
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
                <h2 class="TitleChild">Contenidos</h2>
                <Icon icon="trash1" :size="20" @click="deleteContents()" class="TitleChildIcon"/>
            </div>
            <div class="SliderSection">
                <Slider :contents="category.contents" :addLink="false" :onClick="selectContent" :hover="false"/>
            </div>
    </div>
</template>

<script>
import {  Header, Icon, Slider } from '@/components'
import utils from '@/utils/utils'
import DatePick from 'vue-date-pick';
import "@/theme/DataPicker.css";
import _ from 'lodash'

export default {
    name: 'SectionScreen',
    components: {
        Header,
        DatePick,
        Icon,
        Slider
    },
    data () {
        return {
            category: {
                contents: [],
                id: 0
            },
            toastOptions: {
                position: 'top-center',
                duration: 3000
            },
            saveButton: false,
            originalValues: {}
        }
    },
     watch: {
        category: {
            deep: true,
            handler() {
                this.activateSaveButton();
            }
        }
    },
    methods: {
        handleClickItem(param) {
            this.category.contents.push(param)
        },
        async fetchResult (categoryId) {
            if (this.sectionID || categoryId) {
                this.category = await utils.getSectionScreenInfo(this.sectionID || categoryId);
                this.originalValues = _.clone(this.category);
            }
            this.saveButton = false;
        },
        async saveItem (category) {
            try {
                const newCategory = await utils.saveCategory(category),
                    message = `Categoría ${this.sectionID ? 'actualizada' : 'creada'} correctamente`;
                
                this.category.id = newCategory.id;
                await this.fetchResult(newCategory.id)

                this.saveButton = false;
                
                this.$toasted.success(message, this.toastOptions);
            } catch(err) {
                const message = `Error ${this.sectionID ? 'actualizando' : 'creando'} ` +
                    `la categoría. [err=${err && err.toString()}]`;
                this.$toasted.error(message, this.toastOptions);
            }
        },
        async deleteItem (category) {
            try {
                await utils.deleteCategory(category);
                this.saveButton = false;
                this.$router.push('/')
            } catch(err) {
                const message = `Error eliminando la categoría. [err=${err && err.toString()}]`;
                this.$toasted.error(message, this.toastOptions);
            }
        },
        selectContent(content) {
            content.selected = !content.selected ? true : false;
            content.title += '.';
        },
        async deleteContents() {
            this.category.contents = this.category.contents.filter((content) => !content.selected);
        },
        activateSaveButton() {
            const contents = _.clone(this.category.contents),
                contentsDifferentLength = contents.length !== this.originalValues.contents.length,
                excludeProperties = ['contents', 'updatedAt', 'createdAt', 'status'];

            this.saveButton = false;

            if (contentsDifferentLength) {
                this.saveButton = true;
            }

            for (const content of this.originalValues.contents) {
                const isInContents = contents.find((ref) => {
                    return content.id === ref.id;
                });

                if (!isInContents) {
                    this.saveButton = true;
                    break;
                }
            }

            for (const key in this.originalValues) {
                if (Object.prototype.hasOwnProperty.call(this.originalValues, key)) {
                    const exclude = excludeProperties.find((ref) => {
                        return ref === key;
                    });

                    if (!exclude && this.originalValues[key] !== this.category[key]) {
                        this.saveButton = true;
                        break;
                    }
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
            width: 300px;
            padding: 10px;
            display: inline-block;
        }
        input{
            padding: 5px;
            min-height: 35px;
            width: 270px;
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
        .DatePicker{
            width: 270px;
            border: 1px solid $gray-04;
            border-radius: 4px;
            background: transparent;
        }
    }
}
</style>
