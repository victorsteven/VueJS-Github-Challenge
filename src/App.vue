<template>
  <div id="app">
    <GithubUser />
  </div>
</template>

<script>
import GithubUser from './components/GithubUser.vue';

export default {
  name: 'app',
  components: {
    GithubUser,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
