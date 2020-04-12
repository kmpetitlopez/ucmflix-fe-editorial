import Vue from 'vue'
import Router from 'vue-router'
import { MainScreen, NotFoundScreen, 
    HomePageScreen, SectionScreen, 
    DetailScreen, ImageEditionScreen, ImageGridScreen } from '@/screens'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainScreen,
            children: [
                {
                    path: '/',
                    component: HomePageScreen,
                },
            ],
        },
        {
            path: '*',
            name: '404',
            component: NotFoundScreen,
        },
        {
            path: '/section/:id',
            name: 'section',
            component: SectionScreen,
        },
        {
            path: '/section/',
            name: 'section',
            component: SectionScreen,
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: DetailScreen,
        },
        {
            path: '/detail/',
            name: 'detail',
            component: DetailScreen,
        },
        {
            path: '/image/grid',
            name: 'imageGrid',
            component: ImageGridScreen,
        },
        {
            path: '/image/:id',
            name: 'image',
            component: ImageEditionScreen,
        },
        {
            path: '/image/',
            name: 'image',
            component: ImageEditionScreen,
        }
    ],
})

export default router
