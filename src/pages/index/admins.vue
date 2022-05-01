<template>
    <model-view ref="view" resource="admins" show-status-column action-column-width="260">
        <template #table-columns>
            <el-table-column label="登录账号" prop="username"></el-table-column>

            <el-table-column label="角色">
                <template #default="{row}">
                    <div class="space-x-2">
                        <el-tag v-for="role in row.roles" :key="role.id">{{ role.name }}</el-tag>
                    </div>
                </template>
            </el-table-column>

            <status-column label="超级管理员" prop="super" true-text="是" false-text="否" hide-false-text></status-column>
        </template>

        <template #action-buttons="{row}">
            <el-button @click="showRoleDialog(row)" size="small" type="success" :disabled="row.super">角色</el-button>
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

    <extend-dialog v-model="roleDialog.visible" :loading="status.status.refreshRoles" title="角色设置">
        <div class="border-b mb-2">
            <el-checkbox v-model="roleDialog.checkAll" :indeterminate="roleDialog.indeterminate" @change="onRoleCheckAll">全选</el-checkbox>
        </div>

        <el-checkbox-group v-model="roleDialog.selectedRoles">
            <div class="grid grid-cols-2">
                <el-checkbox v-for="role in roleDialog.roles" :key="role.id" :label="role.id">{{ role.name }} <span class="text-xs text-gray-400">{{ role.description }}</span></el-checkbox>
            </div>
        </el-checkbox-group>

        <template #actions>
            <el-button @click="closeRoleDialog">取消</el-button>
            <el-button @click="submitRoles" type="primary" :loading="status.status.submitRoles">确定</el-button>
        </template>
    </extend-dialog>
</template>

<script setup>
import ModelView from "../../components/views/model-view.vue";
import StatusColumn from "../../components/columns/status-column.vue";
import {reactive, ref, watch} from "vue";
import {useStatus} from "../../states/status";
import ExtendDialog from "../../components/extend/extend-dialog.vue";
import api from "../../utils/api";

const status = useStatus()

const view = ref()

const roleDialog = reactive({
    visible: false,
    row: null,
    roles: [],
    selectedRoles: [],
    checkAll: false,
    indeterminate: false,
})

const showRoleDialog = (row) => {
    refreshRoles()
    roleDialog.visible = true
    roleDialog.row = row
    roleDialog.selectedRoles = row.roles.map(item => item.id)
}

const closeRoleDialog = () => {
    roleDialog.visible = false
    roleDialog.row = null
    roleDialog.selectedRoles = []
    roleDialog.checkAll = false
    roleDialog.indeterminate = false
}

const refreshRoles = () => {
    api().get('admin_roles', {params: {status: true}, label: 'refreshRoles'}).then(res => {
        roleDialog.roles = res
        setRoleStatus()
    })
}

const submitRoles = () => {
    api().post(['admin', roleDialog.row.id, 'role'], {
        roles: roleDialog.selectedRoles,
    }, 'submitRoles').then(res => {
        closeRoleDialog()
        view.value.refresh()
    })
}

const onRoleCheckAll = () => {
    roleDialog.indeterminate = false

    if (roleDialog.checkAll) {
        roleDialog.roles.forEach(role => {
            if (!roleDialog.selectedRoles.includes(role.id)) {
                roleDialog.selectedRoles.push(role.id)
            }
        })
    } else {
        roleDialog.roles.forEach(role => {
            let index = roleDialog.selectedRoles.findIndex(id => id === role.id)
            if (index >= 0) {
                roleDialog.selectedRoles.splice(index, 1)
            }
        })
    }
}

const setRoleStatus = () => {
    let selectedCount = roleDialog.selectedRoles.length
    let totalCount = roleDialog.roles.length

    roleDialog.checkAll = selectedCount > 0 && selectedCount === totalCount
    roleDialog.indeterminate = selectedCount > 0 && selectedCount < totalCount
}

watch(() => roleDialog.selectedRoles, () => {
    setRoleStatus()
})
</script>

<style scoped>

</style>
