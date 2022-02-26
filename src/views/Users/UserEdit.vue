<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="mt-1" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span style="float: left; font-weight: bold">{{
            $route.params.id !== "new" ? "Edit User" : "Create User"
          }}</span>
          <el-button style="float: right" type="primary">
            <router-link style="color: white" to="/users">Go Back</router-link>
          </el-button>
        </div>
        <div class="text item">
          <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="form"
            label-width="120px"
          >
            <el-form-item label="Nombre" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Correo" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')"
                >Submit</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import UserService from "../../services/user.service";
export default {
  name: "UserEdit",
  data() {
    return {
      loading: false,
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "Por favor introduzca un nombre",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
          {
            required: true,
            message: "Por favor introduzca un email",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    if (this.$route.params.id !== "new") {
      this.getData();
    }
  },
  methods: {
    async getData() {
      this.toggleLoading();
      const res = await UserService.getUser(this.$route.params.id);
      const data = await res.data.data;
      this.form = data;
      this.toggleLoading();
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            name: this.form.name,
            email: this.form.email,
          };
          this.sendData(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async sendData(data) {
      this.toggleLoading();
      await UserService.updateUser(this.$route.params.id, data)
        .then((response) => {
          console.log(response,'r')
          this.$router.push({
            name: "Users",
          });
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
