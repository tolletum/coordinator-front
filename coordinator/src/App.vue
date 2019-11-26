<template>
  <div id="app">
    <NavBar />
    <!-- <BodyHome :isInit="isInit" /> -->
    <employees-list/>
    <Footer/>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import BodyHome from "./components/BodyHome.vue";
import EmployeesList from './components/EmployeesList.vue'

export default {
  name: "app",
  data() {
    return {
      isInit: true,
    }
  },
  components: {
    NavBar,
    Footer,
    BodyHome,
    EmployeesList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0 auto;
}

</style>
