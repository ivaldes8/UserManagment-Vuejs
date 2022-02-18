<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="mt-1" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span style="float: left; font-weight: bold">Devices</span>
          <el-button style="float: right" type="primary" @click="handleEdit()"
            >Create Device</el-button
          >
        </div>
        <div class="text item" v-if="tableData.length">
          <Table
            :tableData="tableData"
            @delete="handleDelete($event)"
            @edit="handleEdit($event)"
          >
            <template v-slot:cell>
              <el-table-column prop="vendor" label="Vendor"></el-table-column>
              <el-table-column prop="status" label="Status"></el-table-column>
              <el-table-column prop="gateway" label="Gateway">
                <template slot-scope="scope">
                  {{ scope.row.gateway.ipv4 }}
                </template>
              </el-table-column>
            </template>
          </Table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import Table from "../components/Table.vue";
export default {
  name: "Device",
  components: {
    Table,
  },
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  mounted() {
    this.getData();
    console.log(this.tableData.length);
  },
  methods: {
    async getData() {
      this.toggleLoading();
      const res = await fetch("http://127.0.0.1:5000/devices?_expand=gateway");
      this.toggleLoading();
      this.tableData = await res.json();
    },
    handleEdit(row) {
      if (row) {
        this.$router.push({
          name: "DeviceEdit",
          params: { id: row.id },
        });
      } else {
        this.$router.push({
          name: "DeviceEdit",
          params: { id: "new" },
        });
      }
      console.log("EDIT", row);
    },
    async handleDelete(row) {
      this.toggleLoading();
      await this.deleteElement(row);
      this.getData();
      this.toggleLoading();
    },
    async deleteElement(row) {
      await fetch(`http://127.0.0.1:5000/devices/${row.id}`, {
        method: "DELETE",
      });
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
