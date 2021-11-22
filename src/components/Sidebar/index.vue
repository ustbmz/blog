<template>
  <div>
    <div class="sider" :class="{ bottomHeight: bottomHeight }">
      <div class="title-name titile-active">{{ catalog }}</div>
      <div class=" pd1 text-center  select">
        <ul>
          <li
            @click="changeShowFlag(true)"
            :class="{ activeItem: showFlag === true }"
          >
            <i
              class="iconfont icon-fenleimulu"
              style="font-size: 26px; color: rgb(114, 151, 75);"
            ></i>
            目录
          </li>
          <li
            @click="changeShowFlag(false)"
            :class="{ activeItem: showFlag === false }"
          >
            <i
              class="iconfont icon-shuqian-"
              style="font-size: 26px; color: rgb(114, 151, 75);"
            ></i>
            书签
          </li>
        </ul>
      </div>
      <ul class="nav flex-column" v-show="showFlag">
        <li
          class="nav-item"
          v-for="(item, index) in lists"
          :key="'item' + index"
          :class="{ active: contentName === item.title }"
          @click="changeContent(item)"
        >
          <a class="nav-link"> {{ index + 1 }} {{ item.title }} </a>
          <span class="nav-time">{{ moment(item.created) }}</span>
        </li>
      </ul>
      <ul id="titleList" class="nav flex-column titlelist" v-show="!showFlag">
        <li
          class="titlelist-item"
          v-for="(item, index) in itemTitleList"
          :key="'item' + index"
          @click="handleAnchorClick(item)"
          :class="{
            scrollActive:
              itemTitleList.length > 1 &&
              scrollHeight > item.offsetHeight &&
              scrollHeight < itemTitleList[index + 1].offsetHeight
          }"
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

<script>
import store from '@/store'
import {
  defineComponent,
  computed,
  reactive,
  watch,
  onMounted,
  toRefs
} from 'vue'
import { ScrollToElem } from '@/utils/common.js'
import { moment } from '@/utils/memont'

export default defineComponent({
  props: ['titlelist'],
  setup (props, { emit }) {
    const state = reactive({
      clickname: '',
      bottomHeight: false,
      scrollHeight: 0
    })

    const itemTitleList = computed(() => {
      return props.titlelist
    })

    const changeShowFlag = val => {
      store.commit('setShowFlag', val)
    }
    const changeContent = item => {
      ScrollToElem('.container', 500, -65)
      store.commit('setMDitem', item)
      store.commit('setContentName', item.title)
    }
    const handleAnchorClick = item => {
      state.clickname = item.title
      emit('handleAnchorClick', item)
    }

    const onScroll = () => {
      const docScrollTop =
        document.documentElement && document.documentElement.scrollTop
      console.log(docScrollTop, '高度')

      state.scrollHeight = docScrollTop + 200

      if (docScrollTop > 1000 && !store.state.topFlag) {
        setTimeout(() => {
          store.commit('setTopFlag', true)
        }, 2000)
      }
      if (docScrollTop < 1000 && store.state.topFlag) {
        setTimeout(() => {
          store.commit('setTopFlag', false)
        }, 2000)
      }
      const docClientHeight =
        document.body.clientHeight && document.documentElement.clientHeight
      console.log(docClientHeight, '页面高度')

      const docScrollHeight = document.body.scrollHeight
      // console.log(this.docScrollHeight, '文档实际高度')
      const fromBottom = docScrollHeight - docScrollTop - docClientHeight
      console.log(fromBottom, '距离底部的高度')

      if (fromBottom < 200 && !state.bottomHeight) {
        state.bottomHeight = true
      }
      if ((fromBottom > 400 && state.bottomHeight) || docScrollTop < 400) {
        state.bottomHeight = false
      }
    }

    watch(
      () => {
        return state.scrollHeight
      },
      (newval, oldval) => {
        console.log('🚀 ~ file: index.vue ~ line 72 ~ setup ~ oldval', oldval)
        console.log('🚀 ~ file: index.vue ~ line 72 ~ setup ~ newval', newval)
        if (!store.state.showFlag) {
          const el = document.querySelector('.scrollActive')
          console.log('el', el)
          if (el && el !== undefined && el !== null) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            })
          }
        }
      }
    )

    onMounted(() => {
      window.addEventListener('scroll', onScroll, false)
    })

    return {
      ...toRefs(state),
      moment,
      itemTitleList,
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
      }),
      showFlag: computed(() => {
        return store.state.showFlag
      })
    }
  }
})
</script>

<style lang="scss" scoped>
$primary-color: rgb(114, 151, 75);
.sider {
  height: 670px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  background: #fff;
  overflow-y: scroll;
  color: #666;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  z-index: 2;
  &.bottomHeight {
    height: 500px;
  }
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
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    flex-flow: row nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    min-height: 50px;
    transition: #fff 0.3s;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    &.active {
      background: rgb(210, 236, 184);
      opacity: 0.8;
      border-left: 2px solid rgb(114, 151, 75);
      box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
    }
    .nav-time {
      margin-top: 6px;
      font-size: 12px;
      color: #666;
      line-height: 12px;
    }
  }
  .titlelist {
    cursor: pointer;
    list-style: decimal;
    .titlelist-item {
      display: flex;
      line-height: 1;
      justify-content: flex-start;
      align-items: center;
      flex-flow: row nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      min-height: 30px;
      transition: rgb(117, 86, 86) 0.3s;
      &.scrollActive {
        background: rgb(210, 236, 184);
        opacity: 0.8;
        border-left: 2px solid rgb(114, 151, 75);
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
    width: 68px;
    height: 2px;
    background: $primary-color;
    bottom: 0px;
    right: -14px;
  }
}

::-webkit-scrollbar-track-piece {
  //滚动条凹槽的颜色，还可以设置边框属性
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  //滚动条的宽度
  width: 0px;
  height: 9px;
}
::-webkit-scrollbar-thumb {
  //滚动条的设置
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>
