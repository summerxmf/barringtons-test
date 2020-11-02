<template>
  <div id="app" @touchmove.prevent>
    <!-- <b-header /> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
};
</script>
<style lang="scss" scoped>
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
