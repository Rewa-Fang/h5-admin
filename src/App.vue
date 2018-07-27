<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: none;
}
body,html{
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
