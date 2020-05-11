<template>
    <vueper-slides
        class="SliderSectionSlides"
        :arrowsOutside="false"
        :bullets="false"
        :visible-slides="7"
        :fixed-height="true"
        :gap="1"
        :touchable="false"
        slide-multiple
        lazy
    >
        <vueper-slide 
            v-for="(content) in contents" 
            :key="content.title" :link="addLink ? ('/detail/' + content.id) : ''"
            :class="{'Info': (!content.hover || !hover), 'Img': (content.hover && hover)}"
            @mouse-enter="onHoverEnter(content)"
            @mouse-leave="onHoverLeave(content)"
            @click.native="onClick(content)"
        >
            <template v-slot:content>
                <div v-if="content.hover && hover" >
                    <div
                        class="ImgChild"
                        :style="`background-image: url(${content.imageUrl});`"
                    ></div>
                </div>
                <div class="InfoChild" v-if="!content.hover || !hover">
                    <h2 class="InfoChildTitle">{{ content.fullName}}</h2>
                    <footer>
                        <span class="FooterChild" v-if="addLink">{{ content.year || '-' }}</span>
                        <span class="FooterChild" v-if="addLink">{{ content.country || '-' }}</span>
                        <span class="FooterChild" v-if="addLink">{{ content.duration ? content.duration + 'min' : '-' }}</span>
                        <Icon icon="x-circle" :size="20" v-if="content.status === constants.STATUS.expired" class="FooterChild"/>
                        <Icon icon="tv" :size="20" v-if="content.status === constants.STATUS.active" class="FooterChild"/>
                        <Icon icon="clock" :size="20" v-if="content.status === constants.STATUS.programmed" class="FooterChild"/>
                        <Icon icon="check-square" :size="20" v-if="!addLink && content.selected" class="InfoChildSelected"/>
                        <Icon icon="square" :size="20" v-if="!addLink && !content.selected"/>
                    </footer>
                </div>
            </template>
        </vueper-slide>
    </vueper-slides>
</template>

<script>
import VueTypes from 'vue-types'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import {Icon} from '@/components';
import constants from '@/utils/constants'

export default {
    name: 'Slider',
    components: {
        VueperSlides,
        VueperSlide,
        Icon
    },
    props: {
        contents: VueTypes.array.isRequired,
        addLink: VueTypes.bool.def(true),
        hover: VueTypes.bool.def(true),
        onClick: VueTypes.func.def(() => {})
    },
    data () {
        return {}
    },
    methods: {
        onHoverEnter (content) {
            if (this.hover) {
                content.hover = true;
            }
        },
        onHoverLeave (content) {
            if (this.hover) {
                content.hover = false;
            }
        }
    },
    created: function () {
        this.constants = constants.getConstants();
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.SliderSection {
    width: 100%;
    .SliderSectionSlides {
        height: 150px;
        .Img {
            background-color: $white;
            border: 1px solid $black-medium;
            .ImgChild {
                background-size: cover;
                height: 150px;
            }
        }
        .Info {
            background-color: $black-light;
            border: 1px solid $black-medium;
            cursor: pointer;
            .InfoChild{
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
                    bottom: 5px;
                    position: absolute;
                    font-size: 14px;
                    .FooterChild{
                        padding: 10px;
                    }
                    .InfoChildSelected{
                        color:$success
                    }
                }
                .InfoChildTitle{
                    display: inline-block;
                    
                }
            }
        }
    }
}
</style>
