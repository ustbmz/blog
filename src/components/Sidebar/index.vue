<template>
  <div>
    <div class="sider">
      <div class="title-name">{{ titleName }} 文章列表</div>
      <ul class="nav flex-column">
        <li
          class="nav-item"
          v-for="item in lists"
          :key="'item' + item.index"
          :class="{ active: contentName === item.title }"
          @click="changeContent(item)"
        >
          <a class="nav-link">
            {{ item.title }}
          </a>
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
      store.commit('setContent', item.content)
      store.commit('setContentName', item.title)
    }

    return {
      lists: computed(() => {
        return store.state.mdInfolist
      }),
      changeContent,
      titleName: computed(() => {
        return store.state.title
      }),
      contentName: computed(() => {
        return store.state.contentname
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.sider {
  min-height: 670px;
  min-width: 300px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  background: #fff;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 2;

  .title-name {
    text-align: center;
    font-size: 24px;
    line-height: 64px;
  }

  .nav-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row nowrap;
    text-overflow: ellipsis;
    height: 60px;
    transition: #fff 0.3s;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    &.active {
      background: #04aa6d;
      color: #fff;
    }
    .nav-link {
      padding: 10px;
    }
  }
}
</style>
