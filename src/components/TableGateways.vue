<template>
<div>
  <el-table :data="pagedTableData" style="width: 100%">
    <el-table-column prop="serialNumber" label="Serial Number"></el-table-column>
    <el-table-column prop="name" label="Name"></el-table-column>
    <el-table-column prop="ipv4" label="ipv4"></el-table-column>
    <el-table-column prop="devices" label="Devices"> 
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top" v-if="scope.row.devices.length > 0">
          <p v-bind:key="item.id" v-for="item in scope.row.devices">
            {{ item.vendor}}/{{ item.status }}
          </p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">Hover to see devices</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Operations" v-if="showOperations">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)"
          >Edit</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    layout="prev, pager, next"
    :total="this.tableData.length"
    @current-change="setPage"
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
      default: true
    }
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
    };
  },
  mounted() {
    console.log(this.tableData.length);
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
    handleCurrentChange(val) {
      this.page = val;
    },
  },
};
</script>
