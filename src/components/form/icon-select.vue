<template>
    <el-input v-model="modelValue" clearable class="icon-select">
        <template #prepend>
            <i :class="modelValue"></i>
        </template>
        <template #append>
            <el-button @click="showDialog">选择图标</el-button>
        </template>
    </el-input>

    <el-dialog v-model="dialog" append-to-body title="选择图标">
        <div class="flex px-2 border-b pb-2">
            <el-input v-model="keyword" clearable placeholder="输入关键词搜索"></el-input>
        </div>
        <div v-if="filteredIcons.length" class="flex flex-wrap">
            <div v-for="(item,index) in pageIcons" :key="index" class="flex p-2">
                <el-tooltip :content="item">
                    <div @click="select(item)" class="flex items-center justify-center border border-dashed w-12 h-12 cursor-pointer">
                        <i :class="'bi-' + item" class="text-2xl"></i>
                    </div>
                </el-tooltip>
            </div>
        </div>
        <div v-else class="flex items-center justify-center h-20">无匹配的图标</div>
        <view class="flex items-center justify-center mt-4">
            <el-pagination v-model:current-page="page" v-model:page-size="size" :total="filteredIcons.length" layout="prev,pager,next" hide-on-single-page background></el-pagination>
        </view>
    </el-dialog>
</template>

<script setup>
import icons from 'bootstrap-icons/font/bootstrap-icons.json'
import {computed, ref} from "vue";
defineProps({
    modelValue: String,
})
const emits = defineEmits(['update:modelValue'])
const iconList = Object.keys(icons)
const dialog = ref(false)
const keyword = ref('')
const page = ref(1)
const size = 60
const filteredIcons = computed(() => keyword.value ? iconList.filter(item => item.includes(keyword.value)) : iconList)
const pageIcons = computed(() => filteredIcons.value.slice((page.value - 1) * size, page.value * size))
const showDialog = () => dialog.value = true
const select = (item) => {
    emits('update:modelValue', 'bi-' + item)
    dialog.value = false
}
</script>

<style>
.icon-select .el-input-group__prepend {
    width: 48px !important;
    text-align: center;
    font-size: 16px;
}
</style>
