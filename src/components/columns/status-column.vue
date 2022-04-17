<template>
    <el-table-column :label="label" align="center" width="100">
        <template #default="{row}">
            <el-tag :type="row[prop] ? trueType : falseType" :effect="effect" :round="round">{{ row[prop] ? trueText : falseText }}</el-tag>
        </template>
    </el-table-column>
</template>

<script setup>
defineProps({
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
})
</script>

<style scoped>

</style>
