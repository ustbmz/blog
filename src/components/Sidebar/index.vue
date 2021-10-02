<template>
  <div>
    <div class="sider">
      <div class="title-name">{{ catalog }}</div>
      <div class="layui-row pd1 text-center mouseCuosr">
        <div class="layui-col-md6 brr">
          <a class="" @click="changeShowFlag(true)">目录</a>
        </div>
        <div class="layui-col-md6 text-center">
          <a class="" @click="changeShowFlag(false)">书签</a>
        </div>
      </div>
      <ul class="nav flex-column" v-show="state.showFlag">
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
      <ul class="nav flex-column titlelist" v-show="!state.showFlag">
        <li
          class="titlelist-item"
          v-for="item in titlelist"
          :key="'item' + item.index"
          @click="handleAnchorClick(item)"
          :class="{ active: state.clickname === item.title }"
          :style="{ padding: `0 0 0 ${item.indent * 20}px` }"
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
import { defineComponent, computed, reactive, watch } from 'vue'
import { ScrollToElem } from '@/utils/common.js'

export default defineComponent({
  props: ['titlelist'],
  setup (props, { emit }) {
    const state = reactive({
      showFlag: true,
      clickname: '' as any
    })

    const changeShowFlag = (val: boolean) => {
      state.showFlag = val
    }
    const changeContent = (item: MDInfo) => {
      ScrollToElem('.container', 500, -65)
      store.commit('setMDitem', item)
      store.commit('setContentName', item.title)
    }
    const handleAnchorClick = (item: any) => {
      state.clickname = item.title
      emit('handleAnchorClick', item)
    }

    watch(
      () => {
        return store.state.contentname
      },
      (newval, oldval) => {
        console.log('🚀 ~ file: index.vue ~ line 72 ~ setup ~ oldval', oldval)
        console.log('🚀 ~ file: index.vue ~ line 72 ~ setup ~ newval', newval)
        state.showFlag = true
      }
    )

    return {
      state,
      changeShowFlag,
      handleAnchorClick,
      lists: computed(() => {
        return store.state.mdlists
      }),
      changeContent,
      catalog: computed(() => {
        return store.state.title.toUpperCase()
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
      box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    }
    .nav-link {
      padding: 10px;
    }
  }
  .titlelist {
    .titlelist-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-flow: row nowrap;
      text-overflow: ellipsis;
      height: 40px;
      transition: rgb(117, 86, 86) 0.3s;
      &.active {
        background: #b2ddcc;
        color: #fff;
        box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
      }
      .nav-link {
        padding: 10px;
      }
    }
  }
}

.brr {
  border-right: 1px solid #04aa6d;
}

.mouseCuosr {
  cursor: pointer;
}
</style>
