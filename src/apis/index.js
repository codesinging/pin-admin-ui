import http from "../utils/http"

export default {
    auth: {
        login: (data, config) => http.post('auth/login', data, config),
        logout: (data, config) => http.post('auth/logout', data, config),
        user: config => http.get('auth/user', config),
        menus: config => http.get('auth/menus', config),
        pages: config => http.get('auth/pages', config),
    },

    menu: {
        list: (config) => http.get('admin_menus', config),
        store: (data, config) => http.post('admin_menus', data, config),
        update: (data, config) => http.put('admin_menus/' + data.id, data, config),
        destroy: (data, config) => http.delete('admin_menus/' + data.id, config),
        show: (data, config) => http.get('admin_menus/' + data.id, config),
    },

    admin: {
        list: (config) => http.get('admins', config),
        store: (data, config) => http.post('admins', data, config),
        update: (data, config) => http.put('admins/' + data.id, data, config),
        destroy: (data, config) => http.delete('admins/' + data.id, config),
        show: (data, config) => http.get('admins/' + data.id, config),

        syncRoles: (data, config) => http.post(`admins/${data.id}/sync_roles`, data, config),
        syncPermissions: (data, config) => http.post(`admins/${data.id}/sync_permissions`, data, config),
    },

    role: {
        list: (config) => http.get('admin_roles', config),
        store: (data, config) => http.post('admin_roles', data, config),
        update: (data, config) => http.put('admin_roles/' + data.id, data, config),
        destroy: (data, config) => http.delete('admin_roles/' + data.id, config),
        show: (data, config) => http.get('admin_roles/' + data.id, config),
        permissions: (data, config) => http.get('admin_roles/' + data.id + '/permissions', config),
        permission: (data, config) => http.post('admin_roles/' + data.id + '/permission', data, config),
    },

    page: {
        list: (config) => http.get('admin_pages', config),
        store: (data, config) => http.post('admin_pages', data, config),
        update: (data, config) => http.put('admin_pages/' + data.id, data, config),
        destroy: (data, config) => http.delete('admin_pages/' + data.id, config),
        show: (data, config) => http.get('admin_pages/' + data.id, config),
    },

    route: {
        list: (config) => http.get('admin_routes', config),
        show: (data, config) => http.get('admin_routes/' + data.id, config),
    },
}
