<template>
  <div>
    <div class="sider">
      <div class="title-name titile-active">{{ catalog }}</div>
      <div class=" pd1 text-center  select">
        <ul>
          <li
            @click="changeShowFlag(true)"
            :class="{ activeItem: state.showFlag === true }"
          >
            <i
              class="layui-icon layui-icon-templeate-1"
              style="font-size: 26px; color: rgb(114, 151, 75);"
            ></i>
            目录
          </li>
          <li
            @click="changeShowFlag(false)"
            :class="{ activeItem: state.showFlag === false }"
          >
            <i
              class="layui-icon layui-icon-list"
              style="font-size: 26px; color: rgb(114, 151, 75);"
            ></i>
            书签
          </li>
        </ul>
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
      <Suspense>
        <template #default>
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
        </template>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
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
$primary-color: rgb(114, 151, 75);
.sider {
  min-height: 670px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  background: #fff;
  color: #666;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 2;
  .title-name {
    text-align: center;
    font-size: 24px;
    line-height: 64px;
    color: rgba(43, 42, 42, 0.5);
  }
  .titile-active {
    position: relative;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .nav-item {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row nowrap;
    text-overflow: ellipsis;
    height: 60px;
    transition: #fff 0.3s;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    &.active {
      background: rgb(114, 151, 75);
      a {
        color: #fff !important;
      }
      box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    }
    .nav-link {
      padding: 10px;
    }
  }
  .titlelist {
    cursor: pointer;
    list-style: decimal;
    .titlelist-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-flow: row nowrap;
      text-overflow: ellipsis;
      font-size: 15px;
      line-height: 30px;
      height: 30px;
      transition: rgb(117, 86, 86) 0.3s;
      &.active {
        background: rgb(114, 151, 75);
        a {
          color: #fff !important;
        }
        box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
      }
      .nav-link {
        padding: 10px;
      }
    }
  }
}

.select {
  ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    li {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
  }
}

.activeItem {
  color: $primary-color;
  position: relative;
  &:after {
    position: absolute;
    display: inline-block;
    content: '';
    width: 88px;
    height: 2px;
    background: $primary-color;
    bottom: 0px;
    right: -22px;
  }
}
</style>
