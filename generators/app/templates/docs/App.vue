<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
@import 'highlight.js/styles/color-brewer.css';

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
}
.hljs {
  background: #332d2d;
}
.hljs,
.hljs-subst {
  color: #ffff;
}
.hljs-comment,
.hljs-quote {
  color: #756bb1;
}
.hljs-comment {
  color: #c3e88d;
}
</style>
<style>
/* 引入代码高亮样式 */
</style>
