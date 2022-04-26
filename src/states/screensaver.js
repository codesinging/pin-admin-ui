import {defineStore} from "pinia";

export const useScreensaver = defineStore('screensaver', {
    state: () => ({
        visible: false,
        text: '',
    }),

    actions: {
        show(text) {
            this.visible = true
            this.text = text
        },

        hide(timeout = 0) {
            setTimeout(() => {
                this.visible = false
                this.text = ''
            }, timeout)
        }
    },
})
