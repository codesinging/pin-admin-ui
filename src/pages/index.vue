<template>
    <screensaver>
        <div class="h-screen flex">
            <div class="flex flex-col flex-shrink-0 flex-grow-0 h-full bg-gray-700 overflow-hidden">
                <layout-brand/>
                <layout-menu/>
                <layout-collapse/>
            </div>
            <div class="flex-1 flex flex-col overflow-hidden">
                <layout-header/>
                <layout-tab/>
                <layout-content/>
            </div>
        </div>
    </screensaver>
</template>

<script setup>
import Screensaver from "../components/layout/screensaver.vue";
import {useScreensaver} from "../states/screensaver";
import apis from "../apis";
import LayoutBrand from "../components/layout/layout-brand.vue";
import LayoutMenu from "../components/layout/layout-menu.vue";
import LayoutCollapse from "../components/layout/layout-collapse.vue";
import LayoutHeader from "../components/layout/layout-header.vue";
import LayoutTab from "../components/layout/layout-tab.vue";
import LayoutContent from "../components/layout/layout-content.vue";
import {useLayout} from "../states/layout";
import {useRouter} from "vue-router";

const screensaver = useScreensaver()
const layout = useLayout()
const router = useRouter()

screensaver.show('数据加载中')

apis.auth.menus({label: 'menu', message: false, catch: true}).then(res => {
    const menus = res || []
    menus.forEach(item => {
        item.id = item.id.toString()
        if (item.parent_id) {
            item.parent_id = item.parent_id.toString()
        }
    })

    layout.setMenus(menus)

    const currentPath = router.currentRoute.value.path
    const currentMenu = menus.find(item => '/' + item.path === currentPath)

    layout.addTab(layout.homeMenu)
    layout.addTab(currentMenu)
    layout.setActiveMenu(currentMenu||layout.homeMenu)

    screensaver.hide()
}).catch(() => {
    screensaver.hide()
})
</script>

<style scoped>

</style>
