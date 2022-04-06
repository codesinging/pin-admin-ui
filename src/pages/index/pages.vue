<template>
    <model-view model="page" show-sort-column show-status-column>
        <template #table-columns>
            <el-table-column label="路径" prop="path"></el-table-column>
        </template>

        <template #form-items="{data}">
            <el-form-item label="名称" prop="name" :rules="{required:true, message:'名称不能为空'}">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="路径" prop="path">
                <el-input v-model="data.path"></el-input>
            </el-form-item>
        </template>

        <template #view-items="{data}">
            <el-descriptions-item label="路径">{{ data.path }}</el-descriptions-item>
        </template>
    </model-view>
</template>

<script setup>
import ModelView from "../../components/views/model-view.vue";
</script>

<style scoped>

</style>
