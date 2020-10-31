<template>
  <div id="app" @touchmove.prevent>
    <b-header />
    <country-list></country-list>
    <router-view />
  </div>
</template>
<script>
import BHeader from 'components/b-header';
import CountryList from 'components/country-list';

export default {
  name: 'App',
  components: {
    BHeader,
    CountryList
  }
};
</script>
<style lang="scss" scoped>
/* .g-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 50px;
} */
</style>
