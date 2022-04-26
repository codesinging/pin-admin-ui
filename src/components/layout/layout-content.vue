<template>
    <div class="flex-1 overflow-hidden p-4">
        <el-scrollbar>
            <router-view v-slot="{Component}">
                <keep-alive>
                    <component v-if="permitted" :is="Component"></component>
                    <page403 v-else>{{ route.path }}</page403>
                </keep-alive>
            </router-view>
        </el-scrollbar>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed} from "vue";
import Page403 from '../../components/layout/page-403.vue'
import {useLayout} from "../../states/layout";

const route = useRoute()

const layout = useLayout()

const permitted = computed(() => layout.pageList.includes(route.path))

</script>

<style scoped>

</style>
