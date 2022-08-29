<template>
  <div class="main">
    <div class="sidebar">
      <my-sidebar
        :list="lists"
        :titlelist="titlelist"
        v-model:item="title"
        @handleItem="changeContent"
        @handleAnchorClick="handleAnchorClick"
      ></my-sidebar>
    </div>
    <div class="content topline" id="content">
      <v-md-preview :text="text" ref="preview"></v-md-preview>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, onMounted, toRefs } from 'vue'
import store from '@/store'
import Sidebar from '@/components/Sidebar/index.vue'
import { BlogService } from '@/common/provides/blog'

export default defineComponent({
  components: {
    'my-sidebar': Sidebar
  },
  setup () {
    const { state } = BlogService()

    const preview = ref(null)

    const changeContent = item => {
      state.item = item
    }

    const getTitles = () => {
      setTimeout(() => {
        const anchors = preview.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
        state.titlelist = Array.from(anchors).filter(
          title => !!title.innerText.trim()
        )
        if (!state.titlelist.length) {
          state.titlelist = []
        }

        const hTags = Array.from(
          new Set(state.titlelist.map(title => title.tagName))
        ).sort()

        state.titlelist = state.titlelist.map(el => {
          return {
            title: el.innerText,
            lineIndex: el.getAttribute('data-v-md-line'),
            indent: hTags.indexOf(el.tagName),
            offsetHeight: el.offsetHeight + gETop(el)
          }
        })
      }, 3000)
      return state.titlelist
    }

    const gETop = x => {
      var t = 0
      while (x) {
        t += x.offsetTop
        x = x.offsetParent
      }
      return t
    }

    const handleAnchorClick = anchor => {
      const { lineIndex } = anchor

      const heading = preview.value.$el.querySelector(
        `[data-v-md-line="${lineIndex}"]`
      )

      if (heading) {
        preview.value.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60
        })
      }
    }

    onMounted(() => {
      console.log('')
    })

    return {
      ...toRefs(state),
      preview,
      changeContent,
      text: computed(() => {
        return store.state.mditem ? store.state.mditem.content : ''
      }),
      MDfileWithType: computed(() => {
        return state.lists
      }),
      titlelist: computed(() => {
        return getTitles()
      }),
      myPostion: computed(() => {
        return document.documentElement.scrollTop
      }),
      handleAnchorClick
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #2C9678;

  .sidebar {
    position: fixed;
    width: 360px;
  }
  .content {
    margin-left: 380px;
    min-height: 754px;
    background: #fff;
    width: 70%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-bottom: 50px;
  }
}
.topline {
  position: relative;
  &:after {
    position: static;
    display: inline-block;
    content: "";
    width: 100%;
    height: 1px;
    background: #EBD671;
    top: -5px;
    left: 0px;
    opacity: 0.4;
  }
}
.titleBar {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-flow: column nowrap;
  background: rgb(223, 50, 50);
  width: 350px;
  min-height: 600px;
  a {
    color: rgb(248, 245, 245);
  }
  z-index: 999;
}
.title-list {
  position: fixed;
  top: 154px;
  left: 10px;
  background: fff;
  z-index: 9999;
  padding: 20px;
  opacity: 1;
}

@media screen and (max-width: 1100px) {
  .container .sidebar {
    display: none;
  }
  .container .content {
    width: 100%;
    margin-left: 10px;
  }
}
</style>
