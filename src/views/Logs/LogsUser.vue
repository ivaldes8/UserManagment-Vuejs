<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="mt-1" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span style="float: left; font-weight: bold">Actividades de : {{$route.params.name}}</span>
          <el-button style="float: right" type="primary">
            <router-link style="color: white" to="/users">Go Back</router-link>
          </el-button>
        </div>
        <div class="text item" v-if="tableData">
          <Table
            :tableData="tableData"
            :showOperations="showOperations"
          >
            <template v-slot:cell>
              <el-table-column prop="action" label="Accion"></el-table-column>
              <el-table-column prop="data" label="Datos">
                <template slot-scope="scope">
                  {{ scope.row.data }}
                </template>
              </el-table-column>
              <el-table-column prop="created_at" label="Creado en"></el-table-column>
              <el-table-column prop="updated_at" label="Editado en"></el-table-column>
            </template>
          </Table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import Table from "../../components/Table.vue";
import LogService from '../../services/log.service'
export default {
  name: "UserLog",
  components: {
    Table,
  },
  data() {
    return {
      loading: false,
      showOperations: false,
      tableData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.toggleLoading();
      const res = await LogService.getLogsByUser(this.$route.params.id);
      this.toggleLoading();
      this.tableData = await res.data.data;
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
