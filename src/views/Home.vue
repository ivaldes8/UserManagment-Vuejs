<template>
  <div class="home">
    <el-divider>
      <img alt="Vue logo" style="width: 80%"  src="../assets/logo.png" />
    </el-divider>
    <br>
    <br>
    <br>
    <h1>Welcome to Gateways manager app</h1>
    <DashboardGraph class="mainLogo" />
  </div>
</template>

<script>
// @ is an alias to /src
import DashboardGraph from "@/components/DashboardGraph.vue";

export default {
  name: "Home",
  components: {
    DashboardGraph,
  },
};
</script>
<style scoped>
 .mainLogo {
   padding-top: 1%;
 }
</style>
