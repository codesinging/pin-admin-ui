<template>
    <el-table-column :label="label" align="center" width="100">
        <template #default="scope">
            <el-switch
                v-model="scope.row[prop]"
                @change="change(scope)"
                :loading="cellStatus(scope)"
                size="small"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
            ></el-switch>
        </template>
    </el-table-column>
</template>

<script setup>
import {inject} from "vue";
import {Check, Close} from "@icon-park/vue-next";

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
