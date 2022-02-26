<template>
  <el-row>
    <el-col :span="8" :offset="8">
      <el-card class="mt-5" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span style="float: left; font-weight: bold"
            >Información del usuario actual</span
          >
          <el-button style="float: right" type="primary"
            ><router-link style="color: white" to="/users"
              >Go Back</router-link
            ></el-button
          >
        </div>
        <div class="text item">
          <el-form :model="form" status-icon disabled ref="form">
            <el-form-item class="mt-3" label="Nombre:" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Email:" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Creado en:">
              <el-input v-model="form.created_at"></el-input>
            </el-form-item>
            <el-form-item label="Actualisado en:">
              <el-input v-model="form.updated_at"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import UserService from '../services/user.service'
export default {
  name: "Profile",
  data() {
    return {
      loading: false,
      forgotPassword: false,
      form: {},
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await UserService.getProfile();
      const data = await res.data.data;
      console.log(data, "DATA");
      this.form = data;
      this.loading = false;
    },
  },
};
</script>
<style scoped></style>
