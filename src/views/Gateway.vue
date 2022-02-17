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
          />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import Table from "../components/TableGateways.vue";
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
      await fetch(
        `http://127.0.0.1:5000/gateways/${row.id}`,
        {
          method: "DELETE",
        }
      );
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
