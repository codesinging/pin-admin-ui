<template>
    <el-descriptions v-if="typeof data === 'object'" border :column="1">
        <el-descriptions-item v-for="(value,key) in data" :key="key" :label="key" label-class-name="w-48">
            <template v-if="Array.isArray(value)">
                <div class="space-y-2">
                    <template v-for="(item,index) in value" :key="index">
                        <template v-if="typeof item === 'string' || typeof item === 'number'">{{ item }}</template>
                        <extend-descriptions v-else :data="item"></extend-descriptions>
                    </template>
                </div>
            </template>
            <extend-descriptions v-else-if="typeof value === 'object'" :data="value"></extend-descriptions>
            <template v-else>{{ value }}</template>
        </el-descriptions-item>
    </el-descriptions>
    <template v-else>
        <extend-descriptions v-for="(item,index) in data" :key="index" :data="item"></extend-descriptions>
    </template>
</template>

<script setup>
defineProps({
    data: [Object, Array],
})
</script>

<style scoped>

</style>
