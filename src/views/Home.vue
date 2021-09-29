<template>
  <my-header v-model:catalog="state.title"></my-header>
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
import { computed, defineComponent, onMounted, toRef, watch } from 'vue'
import MyHeader from '@/components/MyHeader/index.vue'
import Sidebar from '@/components/Sidebar/index.vue'
import Content from '@/components/Content/index.vue'
import MyFooter from '@/components/MyFooter/index.vue'
import { BlogService } from '@/common/provides/blog'
import store from '@/store'
import { MDInfo } from '@/common/interface'

export default defineComponent({
  name: 'Home',
  components: {
    'my-header': MyHeader,
    'my-sidebar': Sidebar,
    'my-content': Content,
    'my-footer': MyFooter
  },
  setup () {
    const { state, handleGetlist, init } = BlogService()

    onMounted(() => {
      console.log('List vue onMounted')
      state.title = 'html'
      handleGetlist()
    })

    const changeContent = (item: MDInfo) => {
      state.content = item.content
    }

    const current = toRef(state, 'title')
    watch(current, (newval, oldval) => {
      console.log('🚀 ~ file: Home.vue ~ line 60 ~ watch ~ oldval', oldval)
      store.commit('setTitle', newval)
      init()
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
    margin-top: 44px;
    width: 25%;
  }
  .content {
    margin-left: 10px;
    margin-top: 44px;

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
