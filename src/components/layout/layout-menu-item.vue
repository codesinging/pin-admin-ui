<template>
    <el-menu-item v-if="menuItem.children.length===0" :index="menuItem.id">
        <i :class="menuItem.icon||'bi-gear'"></i>
        <template #title>
            <span class="title">{{ menuItem.name }}</span>
        </template>
    </el-menu-item>
    <el-sub-menu v-else :index="menuItem.id">
        <template #title>
            <i :class="menuItem.icon||'bi-gear'"></i>
            <span class="title">{{ menuItem.name }}</span>
        </template>
        <layout-menu-item v-for="(item,index) in menuItem.children" :key="index" :menu-item="item"></layout-menu-item>
    </el-sub-menu>
</template>

<script setup>
defineProps({
    menuItem: Object,
})
</script>
