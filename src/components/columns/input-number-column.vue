<template>
    <el-table-column :label="label" align="center" width="160">
        <template #default="scope">
            <el-input-number
                v-model="scope.row[prop]"
                @change="change(scope)"
                v-loading="cellStatus(scope)"
                size="small"
            ></el-input-number>
        </template>
    </el-table-column>
</template>

<script setup>
import {inject} from "vue";

defineProps({
    label: String,
    prop: String,
})

const update = inject('update')
const cellStatus = inject('cellStatus')

const change = scope => {
    update(scope)
}
</script>

<style scoped>

</style>
