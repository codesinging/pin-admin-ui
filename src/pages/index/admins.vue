<template>
    <model-view model="admin" show-status-column show-created-at-column show-updated-at-column>
        <template #table-columns>
            <el-table-column label="登录账号" prop="username"></el-table-column>
        </template>
    </model-view>
</template>

<script setup>

import ModelView from "../../components/views/model-view.vue";
</script>

<style scoped>

</style>
