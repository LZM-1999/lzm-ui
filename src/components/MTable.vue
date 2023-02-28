<template>
    <div>
        <el-table ref="table" :data="tableData" v-bind="tableProps" class="admin_table" v-if="!isRightFlow">
            <template v-for="item in tableColumnProps">
                <el-table-column v-bind="item">
                    <template slot-scope="scope">
                        <slot :name="scope.column.label"
                            :slot-scope="{ 'rowData': scope.row, 'columnData': scope.column}">
                            {{ scope.row[scope.column.property] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- 兼容横向表格 -->
        <template v-else>
            <ux-grid  ref="bigDataTable" class="admin_table" v-if="Boolean(bigDataTable.length)">
                <ux-table-column :title="bigDataTable[0][0]" :width="RightFlowColWidth" field="0" fixed="left" />
                <template v-if="bigDataTable[0].length > 1">
                    <ux-table-column v-for="n in (bigDataTable[0].length-1)" :key="n" :field="String(n)"
                        :title="bigDataTable[0][n]" :width="RightFlowColWidth" />
                </template>
            </ux-grid>
        </template>
    </div>
</template>

<script>

export default {
    props: {
        tableData: {//表格数据
            type: Array,
            default() {
                return []
            }
        },
        tableProps: {//表格属性
            type: Object,
            default() {
                return {
                    border: true,
                    fit: true
                }
            }
        },
        tableColumnProps: {//表格列属性
            type: Array,
            default() {
                return []
            }
        },
        isRightFlow: {//是否开启横向表格
            type: Boolean,
            default: false
        },
        rightFlowData:{//横向表格数据源
            type: Array,
            default() {
                return []
            }
        },
        RightFlowColWidth: {//横向表格列宽
            default: ''
        }
    },
    watch: {
        rightFlowData:{//当rightFlowDatad被监听到赋值,则可能是横向表格模式
            handler() {
                if(this.isRightFlow && this.rightFlowData.length>0) {
                    this.setBigDataTable();
                }
            }
        }
    },
    data() {
        return {
            tableColumn: [],
            bigDataTable: []
        }
    },
    methods: {
        setBigDataTable(){
            this.bigDataTable = JSON.parse(JSON.stringify(this.rightFlowData)) 
            this.reloadData(this.bigDataTable)
        },
        reloadData(data) {
            this.$nextTick(() => {
                this.$refs.bigDataTable.reloadData(data.splice(1,1))
            })
        }
    }
}
</script>