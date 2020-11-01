<template>
  <div class="countries">
    <b-header
      ><h1 class="title">Countries Of The World</h1>
      <div class="payment" @click="toPayment">
        <span>Payment</span>
        <i class="iconfont icon-payment"></i>
      </div>
    </b-header>
    <search-box class="search-box" @search="search"></search-box>
    <div class="country-list">
      <list-view
        @select="selectCountry"
        :data="countryList"
        ref="list"
      ></list-view>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from 'axios';
import BHeader from 'base/b-header';
import SearchBox from 'base/search-box';
import ListView from 'base/listview';
import { getList, searchCountry } from 'api/country';

export default {
  name: 'CountryList',
  data() {
    return {
      countryList: [],
      listCopy: []
    };
  },
  computed: {
    noResult() {
      return this.countryList.length === 0;
    }
  },
  created() {
    getList().then((data) => {
      this.countryList = this._sortList(data);
      this.listCopy = this.countryList;
    });
  },

  methods: {
    search(keywords) {
      if (keywords == '') {
        this.countryList = this.listCopy;
        return;
      }
      searchCountry(keywords).then((data) => {
        this.countryList = this._sortList(data);
      });
    },
    selectCountry(country) {
      this.$router.push({
        path: `/country/${country.alpha3Code}`
      });
    },
    toPayment() {
      this.$router.push({ path: '/payment' });
    },
    _sortList(list) {
      if (list.length === 0) return [];
      let map = {};
      list.forEach((item, index) => {
        const key = item.name.charAt(0);
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(item);
      });
      let ret = [];
      for (let key in map) {
        ret.push(map[key]);
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return ret;
    }
  },
  components: {
    BHeader,
    SearchBox,
    ListView
  }
};
</script>
<style lang="scss" scoped>
@import '~common/scss/mixins';
.contries {
  position: relative;

  /* top: 0;
  /* left: 0; */
  width: 100%;
  height: 100%;
}
.title {
  font-size: $font-size-large;
  font-weight: 500;
}

.search-box {
  height: 50px;
  width: 100%;
  @include flex-center();
}

.country-list {
  position: fixed;
  top: 100px;
  bottom: 0;
  width: 100%;
}
</style>
