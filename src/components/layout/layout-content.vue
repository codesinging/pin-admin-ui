<template>
    <div class="flex-1 overflow-hidden p-4">
        <el-scrollbar>
            <router-view v-slot="{Component}">
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
        </el-scrollbar>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>
