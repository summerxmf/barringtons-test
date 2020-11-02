<template>
  <div class="b-header">
    <div class="b-header-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="b-header-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="b-header-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <!-- <a class="icon" target="_blank" href="https://www.barringtongroup.com.au/">
      <img src="~common/images/barringtons250x50.png" alt="" />
    </a>
    <div class="payment" @click="goCreditCart">
      <span>Payment</span>
      <i class="iconfont icon-payment"></i>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'BHeader'
};
</script>
<style lang="scss" scoped>
@import '~common/scss/mixins';
.b-header {
  position: relative;
  @include flex-between();
  height: 50px;
  background: $header-bgc;
  color: $color-text-l;

  &-left {
    margin-left: 10px;
    ~ .mine-navbar-right {
      position: static;
    }
  }
  &-center {
    flex: 1;
    margin: 0 10px;
    ~ .mine-navbar-right {
      position: static;
    }
    @include flex-center();
  }
  &-right {
    position: absolute;
    right: 0;
    @include flex-center();
    height: 100%;
    margin-right: 10px;
  }
}
/* .b-header {
  position: relative;
  height: 50px;
  text-align: left;
  font-size: 12px;
  padding: 15px;
  color: #fff;
  background: $header-bgc;
  @include flex-between();
} */
</style>
