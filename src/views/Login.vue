<template>
  <el-row>
    <br />
    <br />
    <br />
    <el-col :span="8" :offset="8">
      <el-card class="mt-5" shadow="always" v-loading="loading">
        <div class="text item">
          <el-form :model="form" status-icon :rules="rules" ref="form">
            <el-form-item class="mt-3" label="Email" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="text" @click="$router.push('register')"
                >Olvidó su contraseña?</el-button
              >
              <el-button type="primary" @click="submitForm('form')"
                >Entrar</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      forgotPassword: false,
      form: {},
      message: "",
      rules: {
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
        password: [
          {
            required: true,
            message: "Por favor introduzca una contraseña",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            email: this.form.email,
            password: this.form.password,
          };
          this.$store.dispatch("auth/login", data).then(
            () => {
              this.$router.push("/profile");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
  },
};
</script>
<style scoped></style>
