<template>
  <my-header v-model:catalog="state.title" ref="header"></my-header>
  <div class="container">
    <div class="content">
      <my-content :content="initMD"></my-content>
    </div>
  </div>
  <!-- <my-footer></my-footer> -->
  <a class="btn-scroll-top" @click="scrollTop">
    <i class="iconfont icon-dingbu" style="font-size: 36px"></i>
  </a>
</template>

<script lang="ts">
import { ScrollToElem } from '@/utils/common.js'
import { computed, defineComponent, onMounted, toRef, watch } from 'vue'
import MyHeader from '@/components/MyHeader/index.vue'
import Content from '@/components/Content/index.vue'
// import MyFooter from '@/components/MyFooter/index.vue'
import { BlogService } from '@/common/provides/blog'
import store from '@/store'

export default defineComponent({
  name: 'Home',
  components: {
    'my-header': MyHeader,
    'my-content': Content
    // 'my-footer': MyFooter
  },
  setup () {
    const { state, init } = BlogService()

    onMounted(() => {
      console.log('List vue onMounted')
      state.title = 'javascript'
      // handleGetList()
    })

    const current = toRef(state, 'title')
    watch(current, (newval, oldval) => {
      if (newval !== oldval && oldval !== '' && oldval !== undefined) {
        console.log('🚀 ~ file: Home.vue ~ line 60 ~ watch ~ oldval', oldval)
        store.commit('setTitle', newval)
        init()
      }
    })

    const scrollTop = () => {
      ScrollToElem('.container', 500, -65)
    }

    return {
      state,
      initMD: computed(() => {
        return state.item
      }),
      scrollTop
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  background-color: #2C9678;
}

.btn-scroll-top {
  display: block;
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 2.625rem;
  height: 2.625rem;
  transition: transform 0.25s ease-in-out, opacity 0.25s,
  background-color 0.25s ease-in-out;
  color: #fff;
  text-align: center;
  z-index: 1025;
}
</style>
