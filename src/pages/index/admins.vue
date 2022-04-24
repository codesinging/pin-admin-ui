<template>
    <model-view ref="view" model="admin" show-status-column action-column-width="260">
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
            <el-button @click="showRoleDialog(row)" size="small" type="success">角色</el-button>
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
        <el-checkbox-group v-model="roleDialog.selectRoles">
            <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
        </el-checkbox-group>

        <template #actions>
            <el-button @click="closeRoleDialog">取消</el-button>
            <el-button @click="assignRoles" type="primary" :loading="status.status.syncRoles">确定</el-button>
        </template>
    </extend-dialog>
</template>

<script setup>
import ModelView from "../../components/views/model-view.vue";
import StatusColumn from "../../components/columns/status-column.vue";
import {reactive, ref} from "vue";
import apis from "../../apis";
import {useStatus} from "../../states/status";
import ExtendDialog from "../../components/extend/extend-dialog.vue";

const status = useStatus()

const roles = ref([])

const view = ref()

const refreshRoles = () => {
    apis.role.list({params: {status: true}, status: 'refreshRoles'}).then(res => {
        roles.value = res
    })
}

const roleDialog = reactive({
    visible: false,
    row: null,
    selectRoles: [],
})

const showRoleDialog = (row) => {
    refreshRoles()
    roleDialog.visible = true
    roleDialog.row = row
    roleDialog.selectRoles = row.roles.map(item => item.id)
}

const closeRoleDialog = () => {
    roleDialog.visible = false
    roleDialog.row = null
    roleDialog.selectRoles = []
}

const assignRoles = () => {
    apis.admin.syncRoles({
        id: roleDialog.row.id,
        roles: roleDialog.selectRoles,
    }, 'syncRoles').then(res => {
        closeRoleDialog()
        view.value.refresh()
    })
}
</script>

<style scoped>

</style>
