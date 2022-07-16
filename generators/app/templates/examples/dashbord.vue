<template>
  <div style="text-align:center;width:800px;margin:0 auto">
    <h1>模板demo</h1>
    <div v-for="(item, index) in list" :key="index">
      <el-link type="success" style="margin-left:30px">
        <router-link :to="{name: item}">
          <h3>{{item}}</h3>
        </router-link>
      </el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data () {
    return {
      list: []
    };
  },
  created () {
    const template = require.context('./template/', true, /index.vue$/);
    template.keys().forEach(item => {
      this.list.push(item.split('/')[1]);
    });
  }
};
</script>
