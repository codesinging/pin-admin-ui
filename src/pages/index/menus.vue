<template>
    <model-view ref="view" model="menu" is-tree show-status-column show-sort-column :form-attributes="{labelPosition: 'top'}">
        <template #table-columns>
            <el-table-column prop="icon" label="图标" width="60" align="center">
                <template #default="scope">
                    <i :class="scope.row.icon"></i>
                </template>
            </el-table-column>
            <el-table-column prop="path" label="路径"></el-table-column>
            <el-table-column prop="url" label="外部链接" show-overflow-tooltip></el-table-column>
            <el-table-column label="默认展开" align="center" width="100">
                <template #default="scope">
                    <el-switch v-if="scope.row.children.length" v-model="scope.row.opened" @change="view.update(scope)" :loading="view.cellStatus(scope)" inline-prompt :active-icon="Check" :inactive-icon="Close"></el-switch>
                </template>
            </el-table-column>
        </template>

        <template #form-items="{data, list}">
            <el-form-item label="上级菜单" prop="parent_id">
                <el-select v-model="data.parent_id" placeholder="不选则做为顶级菜单" clearable class="w-full">
                    <el-option v-for="menu in list" :key="menu.id" :label="menu.name" :value="menu.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="菜单名称" prop="name" :rules="{required: true, message: '菜单名称不能为空'}">
                <el-input v-model="data.name"></el-input>
            </el-form-item>

            <el-form-item label="链接路径" prop="path">
                <el-input v-model="data.path"></el-input>
            </el-form-item>

            <el-form-item label="外部链接地址" prop="url">
                <el-input v-model="data.url"></el-input>
            </el-form-item>
        </template>

        <template #view-items="{data}">
            <el-descriptions-item label="路由路径">{{ data.path }}</el-descriptions-item>
            <el-descriptions-item label="链接网址">{{ data.url }}</el-descriptions-item>
        </template>
    </model-view>
</template>

<script setup>
import ModelView from "../../components/views/model-view.vue";
import {Check, Close} from "@icon-park/vue-next";
import {ref} from "vue";

const view = ref()
</script>

<style scoped>

</style>
