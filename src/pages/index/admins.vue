<template>
    <model-view model="admin" show-status-column show-created-at-column show-updated-at-column>
        <template #table-columns>
            <el-table-column label="登录账号" prop="username"></el-table-column>
        </template>

        <template #form-items="{data, isEdit}">
            <el-form-item label="登录账号" prop="username" :rules="{required: true, message: '账号不能为空'}">
                <el-input v-model="data.username"></el-input>
            </el-form-item>

            <el-form-item label="名称" prop="name" :rules="{required: true, message: '名称不能为空'}">
                <el-input v-model="data.name"></el-input>
            </el-form-item>

            <el-form-item v-if="isEdit" label="登录密码" prop="password">
                <el-input v-model="data.password" show-password></el-input>
            </el-form-item>

            <el-form-item v-else label="登录密码" prop="password" :rules="{required: true, message: '密码不能为空'}">
                <el-input v-model="data.password" show-password></el-input>
            </el-form-item>
        </template>
    </model-view>
</template>

<script setup>

import ModelView from "../../components/views/model-view.vue";
</script>

<style scoped>

</style>
