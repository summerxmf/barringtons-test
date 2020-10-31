<template>
  <div class="searchBox">
    <i class="iconfont icon-search"></i>
    <input ref="input" type="text" v-model="query" :placeholder="placeholder" />
    <i class="iconfont icon-close" @click="reset" v-show="query"></i>
  </div>
</template>
<script>
import { debounce } from 'common/js/util';
export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: 'Enter country name'
    }
  },
  data() {
    return {
      query: ''
    };
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    },
    clear() {
      this.query = '';
    },
    reset() {
      this.clear();
      this.focus();
    }
  },
  watch: {
    query: debounce(function() {
      this.$emit('search', this.query);
    })
  }
};
</script>
<style lang="scss" scoped>
@import '~common/scss/mixins';
.searchBox {
  border: 1px solid $color-border;
  @include flex-start();
  .iconfont {
    @include flex-center();
    width: 30px;
    &:hover {
      cursor: pointer;
    }
  }
  input {
    flex: 1;
    height: 100%;
    padding: 0 10px;
  }
}
@media screen and (min-width: 720px) {
}
@media screen and (max-width: 719px) {
}
</style>
