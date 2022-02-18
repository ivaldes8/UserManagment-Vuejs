<template>
  <div>
    <el-table :data="pagedTableData" style="width: 100%">
      <slot name="cell" />
      <el-table-column label="Operations" v-if="showOperations">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="page"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="this.tableData.length"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "Table",
  props: {
    tableData: Array,
    showOperations: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    pagedTableData() {
      return this.tableData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
  methods: {
    setPage(val) {
      this.page = val;
    },
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("delete", row);
    },
  },
};
</script>
