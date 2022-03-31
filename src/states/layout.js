import {defineStore} from "pinia";
import {listToTree} from "../utils/tree";

export const useLayout  = defineStore('layout', {
    state: () => ({
        collapsed: false,
        menus: [],
        activeMenu: null,
        tabs: [],
    }),

    getters: {
        homeMenu: state => state.menus.find(menu => menu.default),
        menuTree: state => listToTree(state.menus, null, 'parent_id')
    },

    actions: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed
        },

        setMenus(menus) {
            this.menus = menus
        },

        setActiveMenu(menu) {
            this.activeMenu = menu
        },

        addTab(tab) {
            if (tab?.id && this.tabs.findIndex(item => item.id === tab.id) === -1) {
                this.tabs.push(tab)
            }
        },

        clear(){
            this.collapsed = false
            this.menus = []
            this.activeMenu = null
            this.tabs = []
        },
    },
})
