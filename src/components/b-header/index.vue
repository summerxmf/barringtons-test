<template>
  <div class="b-header">
    <a class="icon" target="_blank" href="https://www.barringtongroup.com.au/">
      <img src="~common/images/barringtons250x50.png" alt="" />
    </a>
  </div>
</template>
<script>
export default {
  name: 'BHeader'
};
</script>
<style lang="scss" scoped>
/* 样式还需改变 */
.b-header {
  position: relative;
  height: 50px;
  text-align: left;
  font-size: 0;
  padding: 15px;
  img {
    display: block;
    width: 100px;
  }
}
</style>
