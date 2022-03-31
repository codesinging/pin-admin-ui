import http from "../utils/http"

export default {
    auth: {
        login: (data, config) => http.post('auth/login', data, config),
        logout: (data, config) => http.post('auth/logout', data, config),
        user: config => http.get('auth/user', config),
        menus: config => http.get('auth/menus', config),
        pages: config => http.get('auth/pages', config),
    }
}
