<template>
  <el-row>
    <br /><br /><br />
    <el-col :span="8" :offset="8">
      <el-card class="mt-1" shadow="always" v-loading="loading">
        <div class="text item">
          <el-form :model="form" status-icon :rules="rules" ref="form">
            <el-form-item label="Name" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="Password Confirmation" prop="confirmPassword">
              <el-input v-model="form.confirmPassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="text" @click="$router.push('login')"
                >Volver Atrás</el-button
              >
              <el-button type="primary" @click="submitForm('form')"
                >Registrar</el-button
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
  name: "Register",
  data() {
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password again'));
        } else if (value !== this.form.password) {
          callback(new Error('Two inputs don\'t match!'));
        } else {
          callback();
        }
      };
    return {
      loading: false,
      form: {},
      message: "",
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
        password: [
          {
            required: true,
            message: "Por favor introduzca una contraseña",
            trigger: "blur",
          },
        ],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
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
            name: this.form.name,
            email: this.form.email,
            password: this.form.password,
            confirm_password: this.form.confirmPassword,
          };
          this.$store.dispatch("auth/register", data).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
              this.loading = false;
              this.$router.push("/profile");
            },
            (error) => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
              this.loading = false;
            }
          );
        }
      });
    },
  },
};
</script>
<style scoped></style>
