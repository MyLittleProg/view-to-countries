<template>

  <RouterView></RouterView>

</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html{
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  min-height: 100%;
  height: auto !important;
}
</style>
