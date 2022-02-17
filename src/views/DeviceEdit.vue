<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card class="mt-1" shadow="always" v-loading="loading">
        <div slot="header" class="clearfix">
          <span style="float: left; font-weight: bold">{{
            $route.params.id !== "new" ? "Edit Device" : "Create Device"
          }}</span>
          <el-button style="float: right" type="primary">
            <router-link style="color: white" to="/devices"
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
            <el-form-item label="Vendor" prop="vendor">
              <el-input v-model="form.vendor"></el-input>
            </el-form-item>
            <el-form-item label="Status" prop="status">
              <el-input v-model="form.status"></el-input>
            </el-form-item>
            <el-form-item label="Gateway" prop="gatewayId">
              <el-select style="float: left" v-model="form.gatewayId" filterable placeholder="Gateway">
                <el-option
                  v-for="item in gateways"
                  :key="item.id"
                  :label="item.ipv4"
                  :value="item.id"
                >
                </el-option>
              </el-select>
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
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
export default {
  name: "DeviceEdit",
  data() {
    return {
      loading: false,
      gateways: [],
      form: {},
      rules: {
        vendor: [
          { required: true, message: "Please input a vendor", trigger: "blur" },
        ],
        status: [
          { required: true, message: "Please input a status", trigger: "blur" },
        ],
        gatewayId: [
          {
            required: true,
            message: "Please input a gateway",
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
    this.getGateways()
  },
  methods: {
    async getGateways(){
      const res = await fetch(
        `http://127.0.0.1:5000/gateways`
      );
      const data = await res.json();
      this.gateways = data
    },
    async getData() {
      this.toggleLoading();
      const res = await fetch(
        `http://127.0.0.1:5000/devices/${this.$route.params.id}`
      );
      const data = await res.json();
      this.form = data;
      this.toggleLoading();
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            vendor: this.form.vendor,
            status: this.form.status,
            gatewayId: this.form.gatewayId,
            createdAt: this.form.createdAt
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
        await fetch(`http://127.0.0.1:5000/devices/${this.$route.params.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        data = { ...data, id: uuidv4(), createdAt: moment() };
        await fetch(`http://127.0.0.1:5000/devices`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
      this.toggleLoading();
      this.$router.push({
        name: "Devices",
      });
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
