import {createRouter, createWebHashHistory} from "vue-router"
import guests from './guests'
import routes from "~pages"
import {appConfig, authConfig} from "../config"
import auth from "../utils/auth"

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.path === '/'){
        next(appConfig.home)
    } else {
        if (guests.includes(to.path)){
            next()
        } else {
            auth.check().then(()=>{
                next()
            }).catch(()=> {
                next(authConfig.login)
            })
        }
    }
})

export default router
