<template>
  <div id="app" @touchmove.prevent>
    <b-header/>
    <nation-list />
    <router-view />
  </div>
</template>
  <script>
  import BHeader from 'components/b-header'
  import NationList from 'components/nation-list'
    export default {
      name: "App",
      components: {
        BHeader,
        NationList
      }    
    }
</script>
<style lang='scss' scoped>

