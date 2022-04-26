<template>
    <div class="flex-1 text-white overflow-hidden">
        <el-scrollbar>
            <el-menu
                v-if="menus.length>0"
                @select="select"
                :collapse="collapsed"
                :default-active="activeMenu?.id"
                :default-openeds="openedMenuIds"
                background-color="#374151"
                text-color="#fff"
            >
                <layout-menu-item v-for="(menu,index) in menuTree" :key="index" :menu-item="menu"></layout-menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import {useLayout} from "../../states/layout";
import {computed} from "vue";
import LayoutMenuItem from "./layout-menu-item.vue";

const layout = useLayout()

const menus = computed(() => layout.menus)
const activeMenu = computed(() => layout.activeMenu)
const collapsed = computed(() => layout.collapsed)
const openedMenuIds = computed(() => menus.value.filter(menu => menu.opened).map(menu => menu.id))
const menuTree = computed(() => layout.menuTree)

const select = index => {
    const menu = menus.value.find(item => item.id === index)
    layout.addTab(menu)
    layout.setActiveMenu(menu)
    layout.setActiveTab(menu)
}
</script>

<style scoped>

</style>
