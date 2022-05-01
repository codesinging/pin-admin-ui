<template>
    <div class="flex justify-between h-14 border-b px-4">
        <div class="flex items-center space-x-2">
            <el-breadcrumb>
                <el-breadcrumb-item v-for="(item,index) in pagePaths" :key="index">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-if="user" class="flex items-center space-x-2 h-full">
            <el-tooltip placement="bottom" :content="isFullscreen?'退出全屏':'全屏显示'">
                <div @click="toggleFullscreen" class="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer">
                    <component :is="isFullscreen ? OffScreen:FullScreen" :stroke-width="3" :size="18"/>
                </div>
            </el-tooltip>
            <el-dropdown>
                <div class="flex items-center space-x-1 cursor-pointer">
                    <el-avatar :size="32" :src="user.avatar" :icon="User"></el-avatar>
                    <div class="text-sm">{{ user.name }}</div>
                    <i class="bi-chevron-down mt-1"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item><i class="bi-person mr-1"></i>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout" divided><i class="bi-power mr-1"></i>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import {useLayout} from "../../states/layout";
import {useScreensaver} from "../../states/screensaver";
import {useFullscreen} from "@vueuse/core";
import {computed} from "vue";
import {treePath} from "../../utils/tree";
import {useRouter} from "vue-router";
import {authConfig} from "../../config";
import {FullScreen, OffScreen, User} from "@icon-park/vue-next";
import auth from "../../utils/auth";
import api from "../../utils/api";

const layout = useLayout()
const screensaver = useScreensaver()
const router = useRouter()

const {isFullscreen, toggle: toggleFullscreen} = useFullscreen()

const pagePaths = computed(() => treePath(layout.menuTree, 'path', layout.activeMenu?.path))

const user = computed(() => auth.user())

const logout = () => {
    screensaver.show('正在注销登录')

    api().post('auth/logout', {}, {catch: true}).finally(() => {
        auth.logout()
        layout.clear()
        router.push(authConfig.login).then(() => screensaver.hide())
    })
}
</script>

<style scoped>

</style>
