<template>
    <div class="Parent">
        <div class="Header">
            <div class="Flex">
                <div class="Logo" @click="$router.push('/')">
                    <h1>UCM<span>FLIX</span></h1>
                </div>
                <div class="SectionTitle">
                    <h2>editorial</h2>
                </div>
            </div>
            <div class="Block2" v-if="isCategory">
                <p class="Information"><span>ID: </span>{{item.id || '-'}}</p>
                <Icon icon="save" :size="20" class="Creation" @click="saveItem(item)" :class="{CreationActive: saveButton}"/>
                <Icon icon="trash1" :size="20" class="Creation" @click="deleteConfirm(item)"/>
                <div class="Search">
                    <Input
                        v-model="value"
                        name="search"
                        type="search"
                        placeholder="Asociar Contenido..."
                        iconLeft="search"
                        :width="300"
                        :handleClick="handleClickItem"
                    />
                </div>
                <Icon v-if="!isLogin" icon="logout" :size="20" class="Buttons" @click="logout"/>
            </div>
            <div class="Block2" v-if="isContent">
                <p class="Information"><span>ID: </span>{{item.id || '-'}}</p>
                <Icon icon="save" :size="20" class="Creation" @click="saveItem(item)" :class="{CreationActive: saveButton}"/>
                <Icon icon="trash1" :size="20" class="Creation" @click="deleteConfirm(item)"/>
                <Icon v-if="!isLogin" icon="logout" :size="20" class="Buttons" @click="logout"/>
            </div>
        </div>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import {Input, Icon} from '@/components';
import constants from '@/utils/constants';
import api from '@/utils/api';

export default {
    name: 'Header',
    props: {
        home: VueTypes.bool.def(true),
        isCategory: VueTypes.bool.def(false),
        isContent: VueTypes.bool.def(false),
        handleClickItem: VueTypes.func.def(() => {}),
        saveItem: VueTypes.func.def(() => {}),
        deleteItem: VueTypes.func.def(() => {}),
        item: VueTypes.object.def({}),
        saveButton: VueTypes.bool.def(false),
        isLogin: VueTypes.bool.def(false)
    },
    components: {
        Input,
        Icon
    },
    data() {
        return {
            value: undefined
        };
    },
    methods: {
        handleClickContentSearch (param) {
            const name =  param.type === this.constants.CONTENT_TYPES.master ? 'master' : 'detail';
            this.$router.push({ name, params: { id: param.id } })
        },
        handleClickCategorySearch (param) {
            this.$router.push({ name: 'section', params: { id: param.id } })
        },
        handleClickImageSearch (param) {
            this.$router.push({ name: 'image', params: { id: param.id } })
        },
        deleteConfirm (item) {
            const message = `¿Está seguro que desea borrar ` +
                `${this.isCategory ? 'la categoría' : 'el contenido'} ${item.title || item.name}? \n` +
                `Esta acción es irreversible.`,
                options = {
                    allowOutsideClick: false,
                    background: '#222',
                    confirmButtonColor: '#333',
                    cancelButtonColor: '#333'
                };
            this.$confirm(message, null, null, options).then(() => {
                return this.deleteItem(item);
            });
        },
        async logout() {
            await api.logout();
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    },
    created: function () {
        this.constants = constants.getConstants();
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.Parent {
    position: sticky;
    top: 0px;
    height: 90px;
    background-color: $secondary;
    z-index: 3;
    .Header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 60px;
        .Flex {
            display: flex;
            .Logo {
                padding-right: 25px;
                border-right: 1px solid $primary;
                margin-right: 25px;
                cursor: pointer;
                h1 {
                    color: $primary;
                    font-size: 50px;
                    margin: 0;
                    padding: 0;
                    span {
                        font-size: 35px;
                        opacity: 0.7;
                    }
                }
            }
            .SectionTitle {
                display: flex;
                align-items: center;
                h2 {
                    font-size: 35px;
                    color: $body-color;
                    margin: 0;
                }
            }
        }
        .Block2 {
            display: flex;
            padding: 20px 40px;
            margin-left: 10px;
            .Search {
                margin-right: 10px;
            }
            .Creation {
                padding: 6px 5px;
                border: 1px solid $gray-04;
                border-radius: 4px;
                cursor: pointer;
                font-size: 15px;
                text-align: center;
                margin-right: 10px;
            }
            .CreationActive{
                border-color: $warning;
                color: $warning
            }
            .Information {
                padding: 6px 5px;
                font-size: 15px;
                text-align: center;
                margin-right: 10px;
            }
        }
        .Buttons{
            cursor: pointer;
            color : $gray-02;
            border: 1px solid $gray-04;
            border-radius: 4px;
            padding: 6px 5px;
        }
    }
}
.flex {
    display: flex
}
</style>
