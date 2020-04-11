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
            :key="i" :link="getPath(content)"
            :class="{'Info': !content.hover, Img: content.hover}"
            @mouse-enter="onHoverEnter(content)"
            @mouse-leave="onHoverLeave(content)"
        >
            <template v-slot:content="">
                <div v-if="content.hover">
                    <div
                        class="Img--test"
                        :style="`background-image: url(${content.imageUrl}), url(${content.defaultImage});`"
                    ></div>
                </div>
                <div class="Info--text" v-if="!content.hover">
                    <h2>{{ content.title }}</h2>
                    <h4>{{ content.genre || 'Entretenimiento/Otros' }}</h4>
                    <p>{{ content.description || '...' }}</p>
                    <footer>
                        <span>{{ content.year || '-' }}</span>
                        <span>{{ content.country || '-' }}</span>
                        <span>{{ content.duration + 'min' || '-' }}</span>
                        <span>{{ content.parentalRating || '-' }}</span>
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

export default {
    name: 'Slider',
    components: {
        VueperSlides,
        VueperSlide
    },
    props: {
        contents: VueTypes.array.isRequired
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
        },
        getPath (content) {
            const path = content.type === 'master' ? '/master/' : '/detail/';
            return path + content.id;
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
            .Img--test {
                background-size: cover;
                height: 150px;
            }
        }
        .Info {
            background-color: $black-light;
            border: 1px solid $black-medium;
            .Info--text{
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
            }
        }
    }
}
</style>
