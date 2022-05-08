<template>
    <model-view ref="view" resource="setting_options" show-sort-column show-status-column @on-edit-dialog-open="onEditDialogOpen">
        <template #table-columns>
            <el-table-column label="分组" prop="group.name"></el-table-column>
            <el-table-column label="类型">
                <template #default="{row}">
                    <el-tag size="small">{{ types[row.type]||row.type }}</el-tag>
                </template>
            </el-table-column>
        </template>

        <template #form-items="{data}">
            <div class="grid grid-cols-2 gap-x-8">
                <el-form-item label="名称" prop="name" :rules="{required: true, message: '名称不能为空'}">
                    <el-input v-model="data.name"></el-input>
                </el-form-item>

                <el-form-item label="分组" prop="group_id" :rules="{required: true, message: '分组不能为空'}">
                    <el-select v-model="data.group_id" :loading="status.status[view.editDialogLabel()]">
                        <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.id"></el-option>
                    </el-select>
                </el-form-item>
            </div>

            <el-form-item label="类型" prop="type">
                <el-select v-model="data.type">
                    <el-option v-for="(text, type) in types" :key="type" :label="text" :value="type"></el-option>
                </el-select>
            </el-form-item>

            <template v-if="data.type === 'input'">
                <div class="grid grid-cols-2 gap-x-8">
                    <el-form-item label="默认值">
                        <el-input v-model="data.default"></el-input>
                    </el-form-item>

                    <el-form-item label="占位符">
                        <el-input v-model="data.attributes.placeholder"></el-input>
                    </el-form-item>

                    <el-form-item label="最大输入长度">
                        <el-input-number v-model="data.attributes.maxlength"></el-input-number>
                    </el-form-item>

                    <el-form-item label="最小输入长度">
                        <el-input-number v-model="data.attributes.minlength"></el-input-number>
                    </el-form-item>

                    <el-form-item label="是否显示输入字数统计">
                        <el-switch v-model="data.attributes.showWordLimit" inline-prompt :active-icon="Check" :inactive-icon="Close"></el-switch>
                    </el-form-item>

                    <el-form-item label="是否显示清空图标">
                        <el-switch v-model="data.attributes.clearable" inline-prompt :active-icon="Check" :inactive-icon="Close"></el-switch>
                    </el-form-item>
                </div>
            </template>

            <template v-else-if="data.type === 'password'">
                <div class="grid grid-cols-2 gap-x-8">
                    <el-form-item label="默认值">
                        <el-input v-model="data.default"></el-input>
                    </el-form-item>

                    <el-form-item label="占位符">
                        <el-input v-model="data.attributes.placeholder"></el-input>
                    </el-form-item>

                    <el-form-item label="最大输入长度">
                        <el-input-number v-model="data.attributes.maxlength"></el-input-number>
                    </el-form-item>

                    <el-form-item label="最小输入长度">
                        <el-input-number v-model="data.attributes.minlength"></el-input-number>
                    </el-form-item>

                    <el-form-item label="是否显示输入字数统计">
                        <el-switch v-model="data.attributes.showWordLimit" inline-prompt :active-icon="Check" :inactive-icon="Close"></el-switch>
                    </el-form-item>

                    <el-form-item label="是否显示清空图标">
                        <el-switch v-model="data.attributes.clearable" inline-prompt :active-icon="Check" :inactive-icon="Close"></el-switch>
                    </el-form-item>
                </div>
            </template>

        </template>
    </model-view>
</template>

<script setup>
import ModelView from "../../components/views/model-view.vue";
import {provide, reactive, ref} from "vue";
import model from "../../utils/model";
import {useStatus} from "../../states/status";
import {Check, Close} from "@icon-park/vue-next";

const status = useStatus()
const view = ref()

const types = ref({
    input: '文本输入框',
    inputNumber: '数字输入框',
    textarea: '多行文本输入框',
    password: '密码输入框',
})

provide('beforeEdit', (data) => {
    data.attributes = data.attributes || {}
    data.options = data.options || {}
    return data
})

const groups = ref(null)

const onEditDialogOpen = () => {
    if (groups.value === null){
        model('setting_groups').label(view.value.editDialogLabel()).list().then(res=>{
            groups.value = res
        })
    }
}
</script>

<style scoped>

</style>
