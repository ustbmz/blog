<template>
  <my-navbar></my-navbar>
  <div class="container">
    <div class="sidebar"><my-sidebar></my-sidebar></div>
    <div class="content"><my-content></my-content></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopNav from '@/components/TopNav/index.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import Content from '@/components/Content/index.vue'

export default defineComponent({
  name: 'Home',
  components: {
    'my-navbar': TopNav,
    'my-sidebar': Sidebar,
    'my-content': Content
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  width: 100%;
  margin: 0;
  .sidebar {
    width: 35%;
  }
}

@media screen and (max-width: 1024px) {
  html body {
    margin-left: 140px;
  }
  .sidebar {
    display: none;
  }
}
</style>
