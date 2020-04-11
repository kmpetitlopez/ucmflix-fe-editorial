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
            v-for="(content, i) in contents" 
            :key="i" :link="addLink ? ('/detail/' + content.id) : ''"
            :class="{'Info': (!content.hover || !hover), 'Img': (content.hover && hover)}"
            @mouse-enter="onHoverEnter(content)"
            @mouse-leave="onHoverLeave(content)"
            @click.native="onClick(content)"
        >
            <template v-slot:content>
                <div v-if="content.hover && hover" >
                    <div
                        class="ImgChild"
                        :style="`background-image: url(${content.defaultImage});`"
                    ></div>
                </div>
                <div class="InfoChild" v-if="!content.hover || !hover">
                    <h2 class="InfoChildTitle">{{ content.title }}</h2>
                    <Icon icon="check-square" 
                        :size="20" v-if="!addLink && content.selected" 
                        class="InfoChildSelected"
                        
                    />
                    <Icon icon="square" 
                        :size="20" v-if="!addLink && !content.selected" 
                        class="InfoChildUnselected"
                        
                    />
                    <h4>{{ content.genre || 'Entretenimiento/Otros' }}</h4>
                    <p>{{ content.description || '...' }}</p>
                    <footer>
                        <span>{{ content.year || '-' }}</span>
                        <span>{{ content.country || '-' }}</span>
                        <span>{{ content.duration ? content.duration + 'min' : '-' }}</span>
                        <span>{{ content.parentalRating || '-' }}</span>
                        <Icon icon="eye-off" :size="20" v-if="content.status === 'expired'"/>
                        <Icon icon="eye" :size="20" v-if="content.status === 'active'"/>
                        <Icon icon="clock" :size="20" v-if="content.status === 'programmed'"/>
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
            content.hover = true
        },
        onHoverLeave (content) {
            content.hover = false
        }
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
                    bottom: 10px;
                    position: absolute;
                    span{
                        padding: 10px;
                    }
                }
                .InfoChildTitle{
                    display: inline-block;
                    
                }
                .InfoChildSelected{
                    float: right;
                    margin-right: 10px;
                    margin-top: 5px;
                    color:$success
                }
                .InfoChildUnselected{
                    float: right;
                    margin-right: 10px;
                    margin-top: 5px;
                }
            }
        }
    }
}
</style>
