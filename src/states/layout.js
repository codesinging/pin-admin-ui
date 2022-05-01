import {defineStore} from "pinia";
import {listToTree} from "../utils/tree";
import api from "../utils/api";

export const useLayout  = defineStore('layout', {
    state: () => ({
        collapsed: false,
        initialized: false,
        menus: [],
        activeMenu: null,
        tabs: [],
        activeTab: null,
        pages: [],
        currentPath: null,
    }),

    getters: {
        homeMenu: state => state.menus.find(menu => menu.default),
        menuTree: state => listToTree(state.menus, null, 'parent_id'),
        homeTab: state => state.menus.find(menu => menu.default),
        pageList: state => state.pages.map(item => '/' + item.path),
    },

    actions: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed
        },

        setMenus(menus) {
            menus = menus || []

            menus.forEach(item => {
                item.id = item.id.toString()
                if (item.parent_id) {
                    item.parent_id = item.parent_id.toString()
                }
            })

            this.menus = menus
        },

        setActiveMenu(menu) {
            if (menu){
                this.activeMenu = menu
            }
        },

        setActiveTab(tab) {
            if (tab){
                this.activeTab = tab
            }
        },

        addTab(tab) {
            if (tab?.path && this.tabs.findIndex(item => item.path === tab.path) === -1) {
                this.tabs.push(tab)
            }
        },

        setPages(pages) {
            this.pages = pages
        },

        setCurrentPath(path){
            this.currentPath = path
            this.setActiveMenu(this.menus.find(item => '/' + item.path === path))
            this.setActiveTab(this.pages.find(item => '/' + item.path === path) || this.activeMenu)
            this.addTab(this.activeTab)
        },

        init() {
            return new Promise((resolve, reject) => {
                if (this.initialized) {
                    resolve()
                } else {
                    Promise.all([
                        api().get('auth/menus', {label: 'refreshAuthMenus', catch: true}),
                        api().get('auth/pages', {label: 'refreshAuthPages', catch: true}),
                    ]).then(res => {
                        this.setMenus(res[0])
                        this.setPages(res[1])
                        this.addTab(this.homeTab)
                        this.initialized = true
                        resolve()
                    }).catch(() => {
                        reject()
                    })
                }
            })
        },

        clear(){
            this.collapsed = false
            this.initialized = false
            this.menus = []
            this.activeMenu = null
            this.tabs = []
            this.activeTab = null
            this.pages = []
            this.currentPath = null
        },
    },
})
