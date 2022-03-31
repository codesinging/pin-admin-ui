import {defineStore} from "pinia";

export const useStatus = defineStore('status', {
    state: () => ({
        status: {
            loading: false,
        }
    }),

    getters: {
        get: state => {
            return (...keys) => !!state.status[keys.join('_')]
        },
    },

    actions: {
        set(...keys) {
            this.status[keys.join('_')] = true
        },

        unset(...keys) {
            this.status[keys.join('_')] = false
        }
    },
})
