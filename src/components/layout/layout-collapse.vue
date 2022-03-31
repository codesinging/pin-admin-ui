<template>
    <div class="h-12 text-white flex items-center justify-end">
        <div class="h-full flex items-center justify-center collapse-box">
            <el-tooltip placement="right" :content="layout.collapsed?'展开菜单':'收缩菜单'" :offset="22">
                <div @click="layout.toggleCollapsed" class="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-800 rounded-full">
                    <component :is="layout.collapsed ? MenuUnfold : MenuFold" :strokeWidth="3"/>
                </div>
            </el-tooltip>
        </div>
    </div>
</template>

<script setup>

import {useLayout} from "../../states/layout";
import {computed} from "vue";
import {layoutConfig} from "../../config";
import {MenuFold, MenuUnfold} from "@icon-park/vue-next";

const layout = useLayout()

const width = computed(() => layoutConfig.sidebar.minWidth + 'px')
</script>

<style scoped>
.collapse-box {
    width: v-bind(width);
}
</style>
