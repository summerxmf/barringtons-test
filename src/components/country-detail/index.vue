<template>
  <transition appear name="slide">
    <div id="detail">dddd</div>
  </transition>
</template>
<script>
export default {
  name: 'CountryDetail'
};
</script>
<style lang="scss" scoped>
@import '~common/scss/mixins';
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
#detail {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* background: $color-background; */
  background: forestgreen;
}
</style>
