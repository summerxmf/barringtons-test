<template>
  <div class="b-header">
    <slot></slot>
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
/* 样式还需改变 */
.b-header {
  /* position: relative; */
  height: 50px;
  text-align: left;
  font-size: 12px;
  padding: 15px;
  color: #fff;
  background: $header-bgc;
  @include flex-between();
}
</style>
