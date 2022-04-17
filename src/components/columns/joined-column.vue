<template>
    <el-table-column :label="label">
        <template #default="{row}">
            {{ data(row) }}
        </template>
    </el-table-column>
</template>

<script setup>
const {props, separator} = defineProps({
    label: String,
    props: Array,
    separator: {
        type: String,
        default: '/',
    },
    linebreak: Boolean,
})

const data = row => props.map(item => row[item]).join(separator)
</script>

<style scoped>

</style>
