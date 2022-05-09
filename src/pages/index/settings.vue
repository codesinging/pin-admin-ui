<template>
    <div class="h-24 flex items-center justify-center" v-if="status.status.refreshGroups||status.status.refreshOptions" v-loading="true"></div>
    <el-tabs v-else v-model="activeGroup">
        <el-tab-pane v-for="group in groups" :key="group.id" :name="group.id" :label="group.name">
            <el-card>
                <template #header>
                    <div class="flex items-center justify-between">
                        <span>{{ group.name }}</span>
                        <el-button size="small" type="primary" @click="refresh">刷新</el-button>
                    </div>
                </template>
            </el-card>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import model from "../../utils/model";
import {ref} from "vue";
import {useStatus} from "../../states/status";

const status = useStatus()

const groups = ref([])
const options = ref([])

const activeGroup = ref(null)

const refresh = () => {
    Promise.all([
        model('setting_groups').label('refreshGroups').list(),
        model('setting_options').label('refreshOptions').list()
    ]).then(res => {
        groups.value = res[0]
        options.value = res[1]
        activeGroup.value = res[0][0]['id']
    })
}

refresh()
</script>

<style scoped>

</style>
