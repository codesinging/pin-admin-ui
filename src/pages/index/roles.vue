<template>
    <model-view model="role" show-status-column show-sort-column>
        <template #table-columns>
            <el-table-column label="描述" prop="description" show-overflow-tooltip></el-table-column>
        </template>

        <template #form-items="{data}">
            <el-form-item label="名称" prop="name">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
        </template>
    </model-view>
</template>

<script setup>

import ModelView from "../../components/views/model-view.vue";
</script>

<style scoped>

</style>
