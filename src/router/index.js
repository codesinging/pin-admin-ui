import {createRouter, createWebHashHistory} from "vue-router"

import routes from "~pages"

console.log(routes)

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
