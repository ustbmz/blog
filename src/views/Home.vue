<template>
  <my-navbar v-model:catalog="state.title"></my-navbar>
  <div class="container">
    <div class="sidebar">
      <my-sidebar
        :list="MDfileWithType"
        v-model:item="state.title"
        @handleItem="changeContent"
      ></my-sidebar>
    </div>
    <div class="content">
      <my-content :content="initMD"></my-content>
    </div>
  </div>
  <my-footer></my-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watchEffect } from 'vue'
import TopNav from '@/components/TopNav/index.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import Content from '@/components/Content/index.vue'
import Footer from '@/components/Footer/index.vue'
import { BlogService } from '@/common/provides/blog'
import store from '@/store'
import { MDInfo } from '@/common/interface'

export default defineComponent({
  name: 'Home',
  components: {
    'my-navbar': TopNav,
    'my-sidebar': Sidebar,
    'my-content': Content,
    'my-footer': Footer
  },
  setup () {
    const { state, handleGetlist } = BlogService()

    onMounted(() => {
      console.log('List vue onMounted')
      state.type = 'html'
      handleGetlist().then(() => {
        state.content = state.lists[1].content
      })
    })

    const changeContent = (item: MDInfo) => {
      state.content = item.content
    }

    watchEffect(() => {
      console.log(state.title)
      store.commit('setTitle', state.title)
    })

    return {
      state,
      changeContent,
      MDfileWithType: computed(() => {
        return state.lists
      }),
      initMD: computed(() => {
        return state.content
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin: 10px;
  min-height: 670px;
  .sidebar {
    width: 25%;
  }
  .content {
    margin-left: 10px;
    width: 75%;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
    background: #f8f9fa;
  }
}

@media screen and (max-width: 900px) {
  .container .sidebar {
    display: none;
  }
  .container .content {
    width: 100%;
  }
}
</style>
