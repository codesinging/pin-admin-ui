import {createRouter, createWebHashHistory} from "vue-router"
import guests from './guests'
import routes from "~pages"
import {appConfig, authConfig} from "../config"
import auth from "../utils/auth"
import {useLayout} from "../states/layout";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next(appConfig.home)
    } else {
        if (guests.includes(to.path)) {
            next()
        } else {
            auth.check().then(() => {
                const layout = useLayout()
                layout.init().then(() => {
                    next()
                }).catch(() => {
                    console.log('加载页面失败')
                })
            }).catch(() => {
                next(authConfig.login)
            })
        }
    }
})

export default router
