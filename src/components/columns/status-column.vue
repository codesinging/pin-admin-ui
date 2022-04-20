<template>
    <el-table-column :label="label" align="center" width="100">
        <template #default="{row}">
            <el-tag v-if="!hideFalseText || isTrue(row)" :type="isTrue(row) ? trueType : falseType" :effect="effect" :round="round">{{ isTrue(row) ? trueText : falseText }}</el-tag>
        </template>
    </el-table-column>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
    label: String,
    prop: String,
    trueText: {
        type: String,
        default: '正常',
    },
    falseText: {
        type: String,
        default: '禁用',
    },
    trueType: {
        type: String,
        default: 'success',
    },
    falseType: {
        type: String,
        default: 'danger',
    },
    effect: {
        type: String,
        default: 'light',
    },
    round: Boolean,
    hideFalseText: Boolean,
})

const isTrue = row => row[props.prop]
</script>

<style scoped>

</style>
