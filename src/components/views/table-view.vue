<template>
    <!--表格头部-->
    <div class="flex justify-between">
        <div class="flex items-center space-x-2">
            <el-button @click="refresh" :icon="Refresh" :loading="status.status.refresh">刷新</el-button>
        </div>
    </div>

    <!--表格-->
    <el-table :data="tableData" border class="mt-2" default-expand-all row-key="id" :indent="15" v-loading="status.status.refresh">
        <el-table-column v-if="showSelectionColumn" type="selection" width="50" align="center"></el-table-column>
        <el-table-column v-if="showIndexColumn" type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column v-if="showIdColumn" type="id" label="ID" prop="id" width="80" align="center"></el-table-column>
        <el-table-column v-if="showNameColumn" label="名称" prop="name" show-overflow-tooltip></el-table-column>

        <slot name="table-columns"></slot>

        <el-table-column v-if="showCreatedAtColumn" label="创建时间" prop="created_at" align="center" width="170"></el-table-column>
        <el-table-column v-if="showUpdatedAtColumn" label="修改时间" prop="updated_at" align="center" width="170"></el-table-column>

        <status-column v-if="showStatusColumn" label="状态" prop="status"></status-column>

        <el-table-column v-if="showActionColumn" label="操作" align="center" :width="actionColumnWidth">
            <template #default="scope">
                <div class="flex items-center justify-center space-x-1">
                    <el-button @click="onView(scope.row)" type="primary" size="small">查看</el-button>
                    <slot name="action-buttons" :row="scope.row"></slot>
                </div>
            </template>
        </el-table-column>
    </el-table>

    <!--分页-->
    <div v-if="!isTree" class="mt-2 px-2 h-11 bg-gray-50 flex items-center justify-between">
        <el-pagination v-if="pageable" background small layout="total, prev, pager, next" v-model:current-page="lister.page" :total="lister.total"/>
        <el-pagination v-else background small layout="total" :total="lister.total"/>
    </div>

    <!--查看对话框-->
    <extend-dialog
        v-model="viewDialog.visible"
        :title="viewDialog.title"
        :close-on-click-modal="false"
        :loading="status.status.show"
    >

        <el-tabs type="card" v-model="viewDataTab">
            <el-tab-pane label="常规" name="common">
                <el-descriptions :column="1" border>
                    <el-descriptions-item label="ID" label-class-name="w-48">{{ viewData.id }}</el-descriptions-item>
                    <el-descriptions-item v-if="viewData.name!==undefined" label="名称">{{ viewData.name }}</el-descriptions-item>

                    <slot name="view-items" :data="viewData"></slot>

                    <el-descriptions-item label="排列序号" v-if="viewData.sort!==undefined">{{ viewData.sort }}</el-descriptions-item>
                    <el-descriptions-item label="状态" v-if="viewData.status!==undefined">
                        <el-tag v-if="viewData.status" type="success" size="small">正常</el-tag>
                        <el-tag v-else type="danger" size="small">禁用</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="创建时间">{{ viewData.created_at }}</el-descriptions-item>
                    <el-descriptions-item label="更新时间">{{ viewData.updated_at }}</el-descriptions-item>
                </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="全部" name="all">
                <extend-descriptions :data="viewData"></extend-descriptions>
            </el-tab-pane>
        </el-tabs>

        <template #actions>
            <el-button @click="closeViewDialog">关闭</el-button>
        </template>
    </extend-dialog>
</template>

<script setup>
import {Refresh} from "@icon-park/vue-next";
import {useStatus} from "../../states/status";
import apis from "../../apis";
import {computed, reactive, ref} from "vue";
import StatusColumn from "../columns/status-column.vue";
import ExtendDialog from "../extend/extend-dialog.vue";
import ExtendDescriptions from "../extend/extend-descriptions.vue";

// 请求状态
const status = useStatus()

// 组件属性
const props = defineProps({
    model: {
        type: String,
        required: true,
    },

    // 是否分页
    pageable: Boolean,

    // 分页大小
    pageSize: {
        type: Number,
        default: 10,
    },

    // 是否树型表格
    isTree: Boolean,

    // 表格属性
    tableAttributes: {
        type: Object,
        default: () => ({}),
    },

    // 是否显示选择列
    showSelectionColumn: Boolean,

    // 是否显示索引列
    showIndexColumn: Boolean,

    // 是否显示 ID 列
    showIdColumn: {
        type: Boolean,
        default: true,
    },

    // 是否显示名称列
    showNameColumn: {
        type: Boolean,
        default: true,
    },

    // 是否显示创建时间列
    showCreatedAtColumn: Boolean,

    // 是否显示更新时间列
    showUpdatedAtColumn: Boolean,

    // 是否显示状态列
    showStatusColumn: Boolean,

    // 是否显示操作列
    showActionColumn: {
        type: Boolean,
        default: true,
    },

    // 是否显示查看按钮
    showViewButton: {
        type: Boolean,
        default: true,
    },

    // 操作列宽度
    actionColumnWidth: {
        type: [String, Number],
        default: 200,
    },

    // 查看时是否刷新数据
    refreshViewData: Boolean,
})

const {
    model,
    pageable,
    pageSize,
    refreshViewData,
} = props

// 当前模型的 api 接口
const api = apis[model]

// 列表
const lister = ref(pageable ? {page: 1, size: pageSize, data: [], total: 0} : {page: 0, data: [], total: 0})

// 把数组转换成列表
const toLister = lister => lister.page === undefined ? {page: 0, data: lister, total: lister.length} : lister

// 表格数据
const tableData = computed(() => lister.value.data)

// 刷新列表数据
const refresh = () => {
    let config = {
        label: 'refresh',
    }

    if (pageable) {
        config.params = {
            page: lister.value.page,
            size: lister.value.size,
        }
    }

    api.list(config).then(res => {
        lister.value = toLister(res)
    })
}

// 查看对话框参数
const viewDialog = reactive({
    visible: false,
    width: 30,
    top: 15,
    fullscreen: false,
    title: '查看详情',
})

// 打开查看对话框
const showViewDialog = () => viewDialog.visible = true

// 关闭查看对话框
const closeViewDialog = () => viewDialog.visible = false

// 查看详情数据
const viewData = ref({})

// 查看详情选项卡
const viewDataTab = ref('common')

// 点击查看按钮
const onView = row => {
    viewData.value = row
    if (refreshViewData) {
        api.show(row, {label: 'show', message: false}).then(res => {
            viewData.value = res
        })
    }
    showViewDialog()
}

// 初始化列表数据
refresh()
</script>

<style scoped>

</style>
