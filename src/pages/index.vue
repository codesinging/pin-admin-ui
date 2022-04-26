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

layout.init().then(() => {
    layout.setCurrentPath(router.currentRoute.value.path)
    screensaver.hide(500)
}).catch(() => {
    screensaver.hide(500)
})

</script>

<style scoped>

</style>
