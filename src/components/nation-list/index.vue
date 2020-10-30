<template>
  <div class="nations">
    <list-view @select="selectNation" :data="nationList" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from 'axios';
import ListView from 'base/listview';
export default {
  name: 'NationList',
  data() {
    return {
      nationList: []
    };
  },
  created() {
    axios.get('/api/all').then((res) => {
      console.log(res);
      this.nationList = this._sortList(res.data);
      console.log(this.nationList);
    });
  },
  methods: {
    _sortList(list) {
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
      return ret;
    },
    selectNation() {}
  },
  components: {
    ListView
  }
};
</script>
<style lang="scss" scoped>
.nations {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
}
</style>
