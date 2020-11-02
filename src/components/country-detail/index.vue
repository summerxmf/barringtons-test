<template>
  <transition appear name="slide">
    <div class="detail">
      <b-header>
        <div class="toCountry" slot="left" @click="toCountry">
          <i class="iconfont icon-back"></i>
        </div>
        <h1 class="title" slot="center">{{ country.name }}</h1>
      </b-header>

      <div class="content">
        <p>Alpha2Code： {{ country.alpha2Code }}</p>
        <p>Alpha3Code： {{ country.alpha3Code }}</p>
        {{ country }}
      </div>
    </div>
  </transition>
</template>
<script>
import BHeader from 'base/b-header';
export default {
  name: 'CountryDetail',
  data() {
    return {
      country: {}
    };
  },
  mounted() {
    this.country = this.$route.params.country;
  },
  methods: {
    toCountry() {
      this.$router.push({ path: '/country' });
    }
  },
  components: {
    BHeader
  }
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
.detail {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .title {
    font-size: $font-size-large;
    font-weight: 500;
    margin-right: 50px;
  }
}
</style>
