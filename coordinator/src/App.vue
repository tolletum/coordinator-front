<template>
    <div id="app">
        <NavBar />
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'app',
    data() {
        return {}
    },
    components: {
        NavBar,
        Footer,
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0 auto;
}

.icon-insert {
    width: 40px;
    color: black;
    cursor: pointer;
}
</style>
