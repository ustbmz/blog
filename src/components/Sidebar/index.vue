<template>
  <div class="sider">
    <span class="title-name"> Nav Title Name</span>
    <samp
      >This text is meant to be treated as sample output from a computer
      program.</samp
    >
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"
          >Disabled</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.sider {
  width: 100%;
  margin: 0;
  margin: 0;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  border-radius: 10px;
  border-right: 1px solid goldenrod;

  .title-name {
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
  }
  .nav {
    margin: 20px;
  }
}
</style>
