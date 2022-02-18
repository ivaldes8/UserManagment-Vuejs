<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="mt-1" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span style="float: left; font-weight: bold">Gateways</span>
          <el-button style="float: right" type="primary" @click="handleEdit()"
            >Create Gateway</el-button
          >
        </div>
        <div class="text item" v-if="tableData">
          <Table
            :tableData="tableData"
            @delete="handleDelete($event)"
            @edit="handleEdit($event)"
          >
            <template v-slot:cell>
              <el-table-column
                prop="serialNumber"
                label="Serial Number"
              ></el-table-column>
              <el-table-column prop="name" label="Name"></el-table-column>
              <el-table-column prop="ipv4" label="ipv4"></el-table-column>
              <el-table-column prop="devices" label="Devices">
                <template slot-scope="scope">
                  <el-popover
                    trigger="hover"
                    placement="top"
                    v-if="scope.row.devices.length > 0"
                  >
                    <p v-bind:key="item.id" v-for="item in scope.row.devices">
                      {{ item.vendor }}/{{ item.status }}
                    </p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">Hover to see devices</el-tag>
                    </div>
                  </el-popover>
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
  name: "Gateway",
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
      const res = await fetch("http://127.0.0.1:5000/gateways?_embed=devices");
      this.toggleLoading();
      this.tableData = await res.json();
    },
    handleEdit(row) {
      if (row) {
        this.$router.push({
          name: "GatewayEdit",
          params: { id: row.id },
        });
      } else {
        this.$router.push({
          name: "GatewayEdit",
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
      await fetch(`http://127.0.0.1:5000/gateways/${row.id}`, {
        method: "DELETE",
      });
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
