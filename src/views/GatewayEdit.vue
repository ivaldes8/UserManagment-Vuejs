<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="mt-1" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span style="float: left; font-weight: bold">{{$route.params.id !== 'new' ? 'Edit Gateway' : 'Create Gateway'}}</span>
          <el-button style="float: right" type="primary">
            <router-link style="color: white" to="/gateways"
              >Go Back</router-link
            >
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
            <el-form-item label="Serial Number" prop="serialNumber">
              <el-input v-model="form.serialNumber"></el-input>
            </el-form-item>
            <el-form-item label="Name" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Ipv4" prop="ipv4">
              <el-input v-model="form.ipv4"></el-input>
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
const ipv4Format =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
import { v4 as uuidv4 } from "uuid";
import moment from 'moment';
export default {
  name: "GatewayEdit",
  data() {
    return {
      loading: false,
      form: {},
      rules: {
        name: [
          { required: true, message: "Please input a name", trigger: "blur" },
        ],
        ipv4: [
          { required: true, message: "Please input a ipv4", trigger: "blur" },
          { pattern: ipv4Format, message: "Please input a valid ipv4" },
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
      const res = await fetch(
        `http://127.0.0.1:5000/gateways/${this.$route.params.id}`
      );
      const data = await res.json();
      this.form = data;
      this.toggleLoading();
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            serialNumber: this.form.serialNumber,
            name: this.form.name,
            ipv4: this.form.ipv4,
            createdAt : this.form.createdAt
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
      if (this.$route.params.id !== "new") {
        console.log("LOL");
        await fetch(`http://127.0.0.1:5000/gateways/${this.$route.params.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        data = { ...data, id: uuidv4(), createdAt: moment() };
        await fetch(`http://127.0.0.1:5000/gateways`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
      this.toggleLoading();
      this.$router.push({
        name: "Gateways",
      });
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
