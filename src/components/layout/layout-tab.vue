<template>
    <div v-if="tabs.length > 0" class="flex px-4 mt-4">
        <div class="flex-1 overflow-hidden layout-tab">
            <el-tabs v-model="activeTabPath" type="card" @tab-remove="onTabRemove">
                <el-tab-pane v-for="(tab,index) in tabs" :key="index" :label="tab.name" :name="tab.path" :closable="!tab.default"></el-tab-pane>
            </el-tabs>
        </div>
        <div v-if="tabs.length>2" class="w-10 flex-shrink-0 border-b flex items-center justify-end">
            <div class="flex items-center justify-center w-8 h-8 bg-gray-50 rounded cursor-pointer">
                <el-dropdown placement="bottom-end" @command="onTabCommand">
                    <i class="bi-chevron-down"></i>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="left">
                                <i class="bi-arrow-left"></i>
                                关闭左侧
                            </el-dropdown-item>
                            <el-dropdown-item command="right">
                                <i class="bi-arrow-right"></i>
                                关闭右侧
                            </el-dropdown-item>
                            <el-dropdown-item command="other">
                                <i class="bi-x-lg"></i>
                                关闭其它
                            </el-dropdown-item>
                            <el-dropdown-item command="all">
                                <i class="bi bi-x-circle"></i>
                                关闭全部
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useLayout} from "../../states/layout";
import {useRouter} from "vue-router";
import {computed, ref, watch} from "vue";

const layout = useLayout()
const router = useRouter()

const tabs = computed(() => layout.tabs)
const menus = computed(() => layout.menus)
const activeTab = computed(() => layout.activeTab)
const activeTabPath = ref(layout.activeTab?.path)

const removeTab = tab => {
    if (tab.path === layout.homeTab.path) {
        return false
    }

    let index = tabs.value.findIndex(item => item.path === tab.path)
    tabs.value.splice(index, 1)
    if (tab.path === activeTabPath.value) {
        const nextTab = tabs.value[index] || tabs.value[tabs.value.length - 1]
        activeTabPath.value = nextTab.path
    }
}

const onTabRemove = path => {
    removeTab(tabs.value.find(tab => tab.path === path))
}

const onTabCommand = command => {
    let activeIndex = tabs.value.findIndex(tab => tab.path === activeTabPath.value)
    let removingTabs = []
    switch (command) {
        case 'left':
            removingTabs = tabs.value.filter((item, index) => index < activeIndex)
            break
        case 'right':
            removingTabs = tabs.value.filter((item, index) => index > activeIndex)
            break
        case 'other':
            removingTabs = tabs.value.filter((item, index) => index !== activeIndex)
            break
        case 'all':
            removingTabs = tabs.value.filter(item => item.path !== layout.homeTab.path)
            break
    }

    removingTabs.forEach(tab => {
        removeTab(tab)
    })
}

const go = path => {
    if (path[0] !== '/') {
        path = '/' + path
    }
    router.push(path)
}

watch(activeTabPath, path => {
    const menu = menus.value.find(menu => menu.path === path)
    layout.setActiveMenu(menu)
    go(path)
})

watch(activeTab, tab => {
    activeTabPath.value = tab.path
})
</script>

<style scoped>

</style>
