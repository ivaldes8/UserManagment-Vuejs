<template>
  <el-row :gutter="12">
    <el-col :span="12">
      <el-card shadow="always" v-loading="loading">
        <v-chart
          style="width: 100%; height: 400px"
          autoresize="autoresize"
          :option="option"
        />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="always" v-loading="loading">
        <v-chart
          style="width: 100%; height: 400px"
          autoresize="autoresize"
          :option="option2"
        />
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import "echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import _ from "lodash";
import UserService from '../services/user.service'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
export default {
  name: "Graph",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "white",
  },
  data() {
    return {
      loading: false,
      gateways: [],
      option: {},
      option2: {}
    };
  },
  mounted() {
    this.getGateways();
  },
  methods: {
    async getGateways() {
      this.toggleLoading();
      const res = await UserService.getUsers();
      const data = await res;
      this.users = data.data.data;
      this.toggleLoading();
      this.buildGraph1();
      this.buildGraph2();
    },
    buildGraph1() {
      let data = [];
      console.log(this.users, 'USers')
      this.users.map((item) => {
        data.push({
          value: item.actividades.length,
          name: item.name,
        });
      });
      this.option = {
        title: {
          text: "Acciones por Usuarios",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: _.map(this.users, "name"),
        },
        series: [
          {
            name: "Actividad de los usuarios",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
    buildGraph2(){
      let data = []
      this.users.map((item) => {
        data.push({
          name: item.name,
          type: "line",
          smooth: true,
          data: item.actividades.map((item2, index) =>  {
            return [item2.created_at, index + 1 ];
          }),
        })
      })
       this.option2 = {
        title: {
          text: "Cantidad de actividades por usuarion en el tiempo",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        xAxis: [
          {
            name: "Date",
            type: "time",
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            name: "Devices",
            type: "value",
          },
        ],
        series: data,
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
            filterMode: "none",
          },
          {
            start: 0,
            end: 100,
            filterMode: "none",
          },
        ],
      }
    },
    toggleLoading() {
      this.loading = !this.loading;
    },
  },
};
</script>
