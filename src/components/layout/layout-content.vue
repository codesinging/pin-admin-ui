<template>
    <div class="flex-1 overflow-hidden p-4">
        <el-scrollbar>
            <router-view v-slot="{Component}">
                <keep-alive v-if="permitted">
                    <component :is="Component"></component>
                </keep-alive>
                <page-forbidden v-else>{{ route.path }}</page-forbidden>
            </router-view>
        </el-scrollbar>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";
import {useLayout} from "../../states/layout";
import PageForbidden from "./page-forbidden.vue";

const route = useRoute()

const layout = useLayout()

const permitted = computed(() => layout.pageList.includes(route.path))

</script>

<style scoped>

</style>
