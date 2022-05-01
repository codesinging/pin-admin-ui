<template>
    <model-view resource="admin_roles" show-status-column show-sort-column action-column-width="240">
        <template #table-columns>
            <el-table-column label="描述" prop="description" show-overflow-tooltip></el-table-column>
        </template>

        <template #action-buttons="{row}">
            <el-button @click="showPermissionDialog(row)" size="small" type="success">权限</el-button>
        </template>

        <template #form-items="{data}">
            <el-form-item label="名称" prop="name" :rules="{required:true, message:'名称不能为空'}">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="data.description"></el-input>
            </el-form-item>
        </template>

        <template #view-items="{data}">
            <el-descriptions-item label="描述">{{ data.description }}</el-descriptions-item>
        </template>
    </model-view>

    <extend-dialog v-model="permissionDialog.visible" title="权限设置" :loading="permissionDialogLoading">
        <el-tabs v-model="permissionDialog.tab" type="card">
            <el-tab-pane name="page" label="页面权限">
                <el-card>
                    <template #header>
                        <div class="-my-2">
                            <el-checkbox v-model="permissionDialog.pageCheckAll" :indeterminate="permissionDialog.pageIndeterminate" @change="onPageCheckAll">全选</el-checkbox>
                        </div>
                    </template>
                    <el-checkbox-group v-model="permissionDialog.selectedPermissions">
                        <div class="grid grid-cols-2">
                            <el-checkbox v-for="page in permissionDialog.pages" :key="page.id" :label="page.permission_id">{{ page.name }} ({{ page.path }})</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-card>
            </el-tab-pane>
            <el-tab-pane name="menu" label="菜单权限">
                <el-card>
                    <template #header>
                        <div class="-my-2">
                            <el-checkbox v-model="permissionDialog.menuCheckAll" :indeterminate="permissionDialog.menuIndeterminate" @change="onMenuCheckAll">全选</el-checkbox>
                        </div>
                    </template>
                    <div class="space-y-2">
                        <el-checkbox-group v-model="permissionDialog.selectedPermissions">
                            <div v-for="menu in permissionDialog.menusTree" :key="menu.id">
                                <div class="border-b py-1">
                                    <el-checkbox :label="menu.permission_id">{{ menu.name }} ({{ menu.path }})</el-checkbox>
                                </div>
                                <div class="grid grid-cols-2 pt-2 pl-6">
                                    <el-checkbox v-for="subMenu in menu.children" :key="subMenu.id" :label="subMenu.permission_id" @change="onSubMenuCheck(subMenu, menu)">{{ subMenu.name }} ({{ subMenu.path }})</el-checkbox>
                                </div>
                            </div>
                        </el-checkbox-group>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane name="route" label="路由权限">
                <el-card>
                    <template #header>
                        <div class="-my-2">
                            <el-checkbox v-model="permissionDialog.routeCheckAll" :indeterminate="permissionDialog.routeIndeterminate" @change="onRouteCheckAll">全选</el-checkbox>
                        </div>
                    </template>
                    <div class="space-y-2">
                        <div v-for="group in permissionDialog.routeGroups" :key="group.controller">
                            <div class="border-b py-1">
                                <el-checkbox v-model="group.checkAll" :indeterminate="group.indeterminate" @change="onRouteGroupCheckAll(group)">{{ group.controllerTitle }} ({{ group.controller }})</el-checkbox>
                            </div>
                            <el-checkbox-group v-model="permissionDialog.selectedPermissions">
                                <div class="grid grid-cols-2 pt-2 pl-6">
                                    <el-checkbox v-for="route in group.children" :key="route.id" :label="route.permission_id">{{ route.action_title }} ({{ route.action }})</el-checkbox>
                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                </el-card>
            </el-tab-pane>
        </el-tabs>

        <template #actions>
            <el-button @click="closePermissionDialog">取消</el-button>
            <el-button @click="submitPermissions" type="primary" :loading="status.status.permission">提交</el-button>
        </template>
    </extend-dialog>
</template>

<script setup>
import ModelView from "../../components/views/model-view.vue";
import {computed, reactive, watch} from "vue";
import ExtendDialog from "../../components/extend/extend-dialog.vue";
import {useStatus} from "../../states/status";
import api from "../../utils/api";

const status = useStatus()

const permissionDialog = reactive({
    visible: false,
    row: null,
    tab: 'page',
    pages: null,
    menus: null,
    menusTree: null,
    routes: null,
    routeGroups: null,
    selectedPermissions: [],
    permissions: [],
    pageCheckAll: false,
    pageIndeterminate: false,
    menuCheckAll: false,
    menuIndeterminate: false,
    routeCheckAll: false,
    routeIndeterminate: false,
})

const permissionDialogLoading = computed(() => status.status.refreshPermissions || status.status.refreshPages || status.status.refreshMenus || status.status.refreshRoutes)

const addSelectedPermissions = items => {
    items.forEach(item => {
        if (!permissionDialog.selectedPermissions.includes(item.permission_id)) {
            permissionDialog.selectedPermissions.push(item.permission_id)
        }
    })
}

const removeSelectedPermissions = items => {
    items.forEach(item => {
        let index = permissionDialog.selectedPermissions.findIndex(id => id === item.permission_id)
        if (index >= 0) {
            permissionDialog.selectedPermissions.splice(index, 1)
        }
    })
}

const showPermissionDialog = (row) => {
    permissionDialog.visible = true
    permissionDialog.row = row
    refreshPages()
    refreshPermissions(row)
}

const closePermissionDialog = () => {
    permissionDialog.visible = false
    permissionDialog.row = null
    permissionDialog.selectedPermissions = []
    permissionDialog.pageCheckAll = false
    permissionDialog.pageIndeterminate = false
    permissionDialog.menuCheckAll = false
    permissionDialog.menuIndeterminate = false
    permissionDialog.routeCheckAll = false
    permissionDialog.routeIndeterminate = false
}

const submitPermissions = () => {
    const data = {
        id: permissionDialog.row.id,
        permissions: permissionDialog.selectedPermissions,
    }
    api().post(['admin_roles', data.id, 'permission'],data, 'permission').then(res => {
        closePermissionDialog()
    })
}

const refreshPermissions = row => {
    api().get(['admin_roles', row.id, 'permission'], 'refreshPermissions').then(res => {
        permissionDialog.selectedPermissions = res.map(item => item.id)
    })
}

const refreshPages = () => {
    if (permissionDialog.pages === null) {
        api().get('admin_pages', {params: {status: 1}, label: 'refreshPages'}).then(res => {
            permissionDialog.pages = res
            setPageStatus()
        })
    }
}

const refreshMenus = () => {
    if (permissionDialog.menus === null) {
        apis.menu.list({params: {status: 1}, label: 'refreshMenus'}).then(res => {
            permissionDialog.menusTree = res
            permissionDialog.menus = initMenus(res)
            setMenuStatus()
        })
    }
}

const initMenus = tree => {
    let menus = []
    tree.forEach(item => {
        menus.push(item)
        menus.push(...initMenus(item.children))
    })

    return menus
}

const refreshRoutes = () => {
    if (permissionDialog.routes === null) {
        apis.route.list({label: 'refreshRoutes'}).then(res => {
            permissionDialog.routes = res
            permissionDialog.routeGroups = initRoutes(res)
            setRouteStatus()
            setRouteGroupStatus()
        })
    }
}

const initRoutes = routes => {
    let tree = []
    routes.forEach(route => {
        let index = tree.findIndex(item => item.controller === route.controller)
        if (index === -1) {
            tree.push({
                controller: route.controller,
                controllerTitle: route.controller_title,
                children: [route],
                checkAll: false,
                indeterminate: false,
            })
        } else {
            tree[index].children.push(route)
        }
    })

    return tree
}

const onPageCheckAll = () => {
    permissionDialog.pageIndeterminate = false
    if (permissionDialog.pageCheckAll) {
        addSelectedPermissions(permissionDialog.pages)
    } else {
        removeSelectedPermissions(permissionDialog.pages)
    }
}

const setPageStatus = () => {
    if (permissionDialog.pages !== null) {
        let selectedCount = permissionDialog.pages.filter(page => permissionDialog.selectedPermissions.includes(page.permission_id)).length
        let pageCount = permissionDialog.pages.length

        permissionDialog.pageCheckAll = selectedCount === pageCount
        permissionDialog.pageIndeterminate = selectedCount > 0 && selectedCount < pageCount
    }
}

const onMenuCheckAll = () => {
    permissionDialog.menuIndeterminate = false
    if (permissionDialog.menuCheckAll) {
        addSelectedPermissions(permissionDialog.menus)
    } else {
        removeSelectedPermissions(permissionDialog.menus)
    }
}

const setMenuStatus = () => {
    if (permissionDialog.menus !== null) {
        let selectedCount = permissionDialog.menus.filter(menu => permissionDialog.selectedPermissions.includes(menu.permission_id)).length
        let pageCount = permissionDialog.menus.length

        permissionDialog.menuCheckAll = selectedCount === pageCount
        permissionDialog.menuIndeterminate = selectedCount > 0 && selectedCount < pageCount
    }
}

const onSubMenuCheck = (subMenu, menu) => {
    let checked = permissionDialog.selectedPermissions.includes(subMenu.permission_id)
    if (checked) {
        addSelectedPermissions([menu])
    } else {
        let count = menu.children.filter(item => permissionDialog.selectedPermissions.includes(item.permission_id)).length
        if (count === 0) {
            removeSelectedPermissions([menu])
        }
    }
}

const onRouteGroupCheckAll = group => {
    group.indeterminate = false
    if (group.checkAll) {
        addSelectedPermissions(group.children)
    } else {
        removeSelectedPermissions(group.children)
    }
}

const setRouteGroupStatus = () => {
    if (permissionDialog.routeGroups !== null) {
        permissionDialog.routeGroups.forEach(group => {
            let selectedCount = group.children.filter(route => permissionDialog.selectedPermissions.includes(route.permission_id)).length
            let childrenCount = group.children.length

            group.checkAll = selectedCount === childrenCount
            group.indeterminate = selectedCount > 0 && selectedCount < childrenCount
        })
    }
}

const onRouteCheckAll = () => {
    permissionDialog.routeIndeterminate = false
    permissionDialog.routeGroups.forEach(group => {
        group.checkAll = permissionDialog.routeCheckAll
        onRouteGroupCheckAll(group)
    })
}

const setRouteStatus = () => {
    if (permissionDialog.routes !== null) {
        let selectedCount = permissionDialog.routes.filter(route => permissionDialog.selectedPermissions.includes(route.permission_id)).length
        let pageCount = permissionDialog.routes.length

        permissionDialog.routeCheckAll = selectedCount === pageCount
        permissionDialog.routeIndeterminate = selectedCount > 0 && selectedCount < pageCount
    }
}

watch(() => permissionDialog.tab, tab => {
    switch (tab) {
        case "page":
            refreshPages()
            break
        case "menu":
            refreshMenus()
            break
        case "route":
            refreshRoutes()
            break
    }
})

watch(() => permissionDialog.selectedPermissions, () => {
    setPageStatus()
    setMenuStatus()
    setRouteStatus()
    setRouteGroupStatus()
})
</script>

<style scoped>

</style>
