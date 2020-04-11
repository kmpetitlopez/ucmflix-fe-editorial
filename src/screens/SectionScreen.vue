<template>
    <div class="SectionScreen">
            <Header :home="false"
                :isCategory="true"
                :item="category"
                :handleClickItem="handleClickItem"
                :saveItem="saveItem"
                :deleteItem="deleteItem"/>

            <div class="Edition">
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
                contents: []
            }
        }
    },
    methods: {
        handleClickItem(param) {
            this.category.contents.push(param)
        },
        async fetchResult () {
            if (this.sectionID) {
                this.category = await utils.getSectionScreenInfo(this.sectionID);
            }
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
        },
        selectContent(content) {
            content.selected = !content.selected ? true : false;
        },
        async deleteContents() {
            this.category.contents = this.category.contents.filter((content) => !content.selected);
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
        .DatePicker{
            width: 300px;
            border: 1px solid $gray-04;
            border-radius: 4px;
            background: transparent;
        }
    }
}
</style>
