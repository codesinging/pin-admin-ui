<template>
    <el-dialog v-model="modelValue" @close="onClose" :width="attr.width + '%'" :top="attr.top + 'vh'" :fullscreen="attr.fullscreen" v-bind="attributes">
        <template #title>
            <div class="flex items-center space-x-2">
                <edit/>
                <span>{{ title }}</span>
                <loading-icon v-if="loading"/>
            </div>
        </template>
        <slot></slot>
        <template #footer>
            <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                    <el-tooltip content="增大" placement="top">
                        <el-button @click="zoomOut" :disabled="!canZoomOut" circle size="small">
                            <plus/>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip content="缩小" placement="top">
                        <el-button @click="zoomIn" :disabled="!canZoomIn" circle size="small">
                            <minus/>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip :content="attr.fullscreen ? '退出全屏':'全屏显示'" placement="top">
                        <el-button @click="toggleFullscreen" circle size="small">
                            <full-screen/>
                        </el-button>
                    </el-tooltip>
                </div>
                <div class="flex items-center space-x-2">
                    <slot name="actions"></slot>
                </div>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import {Edit, Plus, Minus, FullScreen} from "@icon-park/vue-next";
import {computed, getCurrentInstance, reactive, ref} from "vue";
import {useStorage} from "../../utils/storage";
import LoadingIcon from "../icons/LoadingIcon.vue";

defineProps({
    modelValue: Boolean,
    title: String,
    attributes: Object,
    loading: Boolean,
})

const storage = useStorage('component_' + getCurrentInstance().uid)

const attr = reactive(storage.get({
    width: 60,
    top: 20,
    fullscreen: false,
}))

const zoomOut = () => {
    attr.width += 20
    attr.top -= 10
    storage.set(attr)
}

const zoomIn = () => {
    attr.width -= 20
    attr.top += 10
    storage.set(attr)
}

const toggleFullscreen = () => {
    attr.fullscreen = !attr.fullscreen
    storage.set(attr)
}

const canZoomOut = computed(() => attr.width < 100)
const canZoomIn = computed(() => attr.width > 40)

const emits = defineEmits(['update:modelValue'])

const onClose = () => {
    emits('update:modelValue', false)
}
</script>

<style scoped>

</style>
