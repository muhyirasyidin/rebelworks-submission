<template>
  <router-view />
</template>

<script>
import { Vue, Options } from "vue-class-component";

@Options({})
export default class App extends Vue {}
</script>

<style lang="scss">
// main style
@import "./assets/sass/style.vue.scss";
</style>
