<template>
    <table-view model="route" pageable action-column-width="120" :show-name-column="false">
        <template #table-columns>
            <el-table-column label="控制器/方法">
                <template #default="{row}">{{ row.controller + '/' + row.action }}</template>
            </el-table-column>
            <joined-column label="控制器名/方法名" :props="['controller_title', 'action_title']"></joined-column>
            <el-table-column label="权限名" prop="permission.name"></el-table-column>
        </template>
    </table-view>
</template>

<script setup>
import TableView from "../../components/views/table-view.vue";
import JoinedColumn from "../../components/columns/joined-column.vue";
</script>

<style scoped>

</style>
