<template>
  <div class="wrapper">
    <search-box class="search-box" @search="search"></search-box>
    <div class="country-list">
      <list-view
        @select="selectCountry"
        :data="countryList"
        ref="list"
      ></list-view>
      <router-view></router-view>
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from 'axios';
import SearchBox from 'base/search-box';
import ListView from 'base/listview';

export default {
  name: 'CountryList',
  data() {
    return {
      list: [],
      countryList: []
    };
  },
  computed: {
    noResult() {
      return this.countryList.length === 0;
    }
  },
  created() {
    axios
      .get('/api/all')
      .then((res) => {
        console.log(res);
        this.countryList = this._sortList(res.data);
        this.list = this.countryList;
      })
      .catch(() => {
        this.countryList = [];
      });
  },

  methods: {
    search(keywords) {
      if (keywords == '') {
        this.countryList = this.list;
        return;
      }
      axios
        .get(`/api/name/${keywords}`)
        .then((res) => {
          console.log(res);
          if (res) {
            this.countryList = this._sortList(res.data);
          } else {
            this.countryList = [];
          }
        })
        .catch(() => {
          this.countryList = [];
        });
    },
    selectCountry(country) {
      this.$router.push({
        path: `/country/${country.alpha3Code}`
      });
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
    SearchBox,
    ListView
  }
};
</script>
<style lang="scss" scoped>
@import '~common/scss/mixins';

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
