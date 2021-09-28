<template>
  <div class="navbar">
    <ul class="item">
      <li class="avtive">Html</li>
      <li>Css</li>
      <li>JavaScript</li>
      <li>Vue</li>
      <li>LeetCode</li>
      <li>Server</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'navbar',
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  width: 100%;
  z-index: 2;
  font-size: 17px;
  background-color: #282a35;
  color: #f1f1f1;
  width: 100%;
  padding: 0;
  letter-spacing: 1px;
  font-family: 'Source Sans Pro', sans-serif;
  height: 44px;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  margin: 2px;

  li {
    padding: 0 20px;
  }
}

.avtive {
  background: #04aa6d;
}
</style>
