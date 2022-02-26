<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="mt-1" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span style="float: left; font-weight: bold">Usuarios</span>
        </div>
        <div class="text item" v-if="tableData">
          <Table
            :tableData="tableData"
            @delete="handleDelete($event)"
            @edit="handleEdit($event)"
          >
            <template v-slot:cell>
              <el-table-column prop="name" label="Name"></el-table-column>
              <el-table-column prop="email" label="Correo"></el-table-column>
              <el-table-column prop="created_at" label="Actividades">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="goToLog(scope.row)"
                    >Actividades</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="Creado en"
              ></el-table-column>
              <el-table-column
                prop="updated_at"
                label="Editado en"
              ></el-table-column>
            </template>
          </Table>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import Table from "../../components/Table.vue";
import UserService from "../../services/user.service";
import logService from "../../services/log.service";
export default {
  name: "User",
  components: {
    Table,
  },
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  async mounted() {
    await this.getData();
    this.registerLog({
      action: "Obtener lista de usuarios",
      data: "-",
    });
  },
  methods: {
    async getData() {
      this.toggleLoading();
      const res = await UserService.getUsers();
      this.toggleLoading();
      this.tableData = await res.data.data;
    },
    handleEdit(row) {
      if (row) {
        this.$router.push({
          name: "UserEdit",
          params: { id: row.id },
        });
      } else {
        this.$router.push({
          name: "UserEdit",
          params: { id: "new" },
        });
      }
    },
    async handleDelete(row) {
      this.toggleLoading();
      await this.deleteElement(row);
      await this.registerLog({
        action: "Eliminar Usuario",
        data: "-",
      });
      this.getData();
      this.toggleLoading();
    },
    async deleteElement(row) {
      await UserService.deleteUser(row.id)
        .then((response) => {
          console.log(response, "r");
          this.registerLog({
            action: "Eliminar usuario",
            data: JSON.stringify(row),
          });
          this.getData();
        })
        .catch((e) => {
          this.$message.error(`${e.message}`);
        });
    },
    async goToLog(row) {
      await this.registerLog({
        action: "Consultar Actividades",
        data: JSON.stringify(row),
      });
      this.$router.push({
        name: "UserLog",
        params: { id: row.id, name: row.name },
      });
    },
    async registerLog(data) {
      this.toggleLoading();
      await logService
        .createLog(data)
        .then((response) => {
          console.log(response, "r");
        })
        .catch((e) => {
          this.$message.error(`${e.message}`);
        });
      this.toggleLoading();
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
