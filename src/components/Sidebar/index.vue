<template>
  <div>
    <div class="sider">
      <div class="title-name">{{ titleName }} 文章列表</div>
      <div class="samp-str">
        <samp
          >This text is meant to be treated as sample output from a computer
          program.</samp
        >
      </div>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="item in lists" :key="'item' + item.index">
          <a class="nav-link active" href="#" @click="changeContent(item)">{{
            item.title
          }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { MDInfo } from '@/common/interface'
import store from '@/store'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup () {
    const changeContent = (item: MDInfo) => {
      store.commit('setContent', item)
    }

    return {
      lists: computed(() => {
        return store.state.mdInfolist
      }),
      changeContent,
      titleName: computed(() => {
        return store.state.title
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.sider {
  width: 100%;
  min-height: 670px;
  background: #f8f9fa;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  border-right: 1px solid rebeccapurple;

  .title-name {
    width: 100%;
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
  }
  .samp-str {
    padding: 10px 30px;
  }
  .nav {
    margin: 20px;
  }
}
</style>
