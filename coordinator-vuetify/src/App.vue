<template>
    <div id="app">
        <v-app>
            <NavBar />
            <br />
            <br />
            <br />
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
            <Footer />
        </v-app>
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
/* #app {
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
} */
.slide-leave-active {
    transition: opacity 1s ease;
    opacity: 0;
    animation: slide-out 1s ease-out forwards;
}
.slide-leave {
    opacity: 1;
    transform: translateX(0);
}
.slide-enter-active {
    animation: slide-in 1s ease-out forwards;
}

@keyframes slide-out {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-30px);
    }
}
@keyframes slide-in {
    0% {
        transform: translateY(-30px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
