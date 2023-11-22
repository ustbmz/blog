<template>
  <div :class="topFlag ? 'header' : 'header header_narrow'">
    <div class="navbar">
      <i class="iconfont icon-hacker home-icon" @click="togglePro()">
        <span class="logo-title">一个钱端</span>
      </i>
      <ul class="item">
        <li
          v-for="item in lists"
          :key="'item' + item.name"
          :class="{ avtive: catalog === item.name }"
          @update:catalog="title = $event"
          @click="change(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="empty-panel"></div>
  </div>

  <div class="projectlist" :class="{ showAni: isShow }">
    <div class="project-item" v-for="item in projects" :key="item.index">
      <img class="card" :src="item.img" />
      <span class="title">{{ item.name }}</span>
      <span>{{ item.text }}</span>
      <div class="icon-git">
        <a :href="item.github" target="_blank">
          <i class="iconfont icon-github iconBig"></i>
          <span class="link-str">Github</span>
        </a>
        <a :href="item.demo" target="_blank">
          <i class="iconfont icon-wangzhi-copy iconBig"></i>
          <span class="link-str">Demo</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, defineComponent, reactive, toRefs, computed } from 'vue'
import store from '@/store'
import { ScrollToElem } from '@/utils/common.js'

export default defineComponent({
  name: 'navbar',
  props: {
    catalog: {
      type: String,
      default: 'Html'
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      catalog: 'Html',
      isShow: false,
      topFlag: true,
      hoverContral: '',
      showIndex: 0,
      projects: [
        {
          index: 0,
          name: 'BBS 论坛',
          github: 'https://github.com/ustbmz/front',
          text: 'Vue2 + layui + webpack 实现BBS论坛项目 实现自动化构建部署打包',
          demo: 'https://bbs.ustbmz.com/',
          img: require('@/assets/vue.png')
        },
        {
          index: 1,
          name: 'BBS 论坛(Vue3)',
          github: 'https://github.com/ustbmz/front-vue3',
          text: 'Vue3 + TS BBS重构BBS论坛项目',
          demo: 'https://v3bbs.ustbmz.com/',
          img: require('@/assets/vue3.png')
        },
        {
          index: 2,
          name: 'webapp H5移动端',
          github: 'https://github.com/ustbmz/webapp',
          text: 'BBS H5移动端应用，使用 mpvue + mint-ui 框架',
          demo: 'https://webapp.ustbmz.com/',
          img: require('@/assets/mint.png')
        },
        {
          index: 3,
          name: 'admin 后台系统',
          github: 'https://github.com/ustbmz/admin',
          text: '全栈项目 bbs 后端管理系统 使用 vue + ivew-admin 集成框架',
          demo: 'https://admin.ustbmz.com/',
          img: require('@/assets/ivew.png')
        }
      ],
      lists: [
        {
          name: 'C++'
        },
        {
          name: 'Swift'
        },
        {
          name: 'JavaScirpt'
        },
        {
          name: 'LeetCode'
        },
        {
          name: 'Other'
        }

      ]
    })
    const change = item => {
      // eslint-disable-next-line vue/no-mutating-props
      state.catalog = item.name
      state.isShow = false
      state.topFlag = true
      store.commit('setShowFlag', true)
      emit('update:catalog', state.catalog)
      scrollTop()
    }

    const show = () => {
      clearTimeout(state.hoverContral)
      state.hoverContral = setTimeout(() => {
        store.commit('setIsHover', true)
      }, 200)
    }
    const hide = () => {
      clearTimeout(state.hoverContral)
      state.hoverContral = setTimeout(() => {
        store.commit('setIsHover', false)
      }, 300)
    }

    const togglePro = () => {
      state.isShow = !state.isShow
      console.log(state.isShow)
    }

    const changeProject = val => {
      state.showIndex = val
    }

    const onScroll = () => {
      const docScrollTop =
        document.documentElement && document.documentElement.scrollTop
      state.scrollHeight = docScrollTop + 200

      if (docScrollTop > 1000 && state.topFlag && !state.isShow) {
        setTimeout(() => {
          state.topFlag = false
        }, 500)
      }
      if (docScrollTop < 1000 && !state.topFlag) {
        setTimeout(() => {
          state.topFlag = true
        }, 300)
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', onScroll, false)
    })

    const scrollTop = () => {
      ScrollToElem('.container', 500, -65)
    }

    return {
      change,
      show,
      hide,
      togglePro,
      isHover: computed(() => {
        return store.state.isHover
      }),
      scrollTop,
      changeProject,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
@import "~@/assets/icon/iconfont.css";

.header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  transition: all 0.2s ease-out;
  font-size: 20px;
  font-weight: 600;

  .home-icon {
    position: absolute;
    left: 15px;
    color: #248067;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    span {
      margin-left: 10px;
      align-items: center;
      letter-spacing: 2px;
    }
  }

  .navbar {
    cursor: pointer;
    width: 100%;
    background-color: #fff;
    color: #248067;
    width: 100%;
    letter-spacing: 0.2px;
    height: 56px;
    line-height: 56px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: baseline;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    li {
      padding: 0 20px;
    }

    .avtive {
      opacity: 1;
      color: #41b349;
      background: #A4CAB6;
      border-bottom: 2px solid #41b349;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
  }

  .empty-panel {
    height: 15px;
    background: #2C9678;
  }
}

.header_narrow {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s ease-out;

  .navbar {
    height: 36px;
    line-height: 36px;
  }
  .empty-panel {
    height: 10px;
    background: #2C9678;
  }
}
.projectlist {
  position: fixed;
  top: 56px;
  left: -100%; /* test fixed + scroll, on retire la position top */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  z-index: 99;
  background-color: #9FA39A;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  -webkit-transition: all 0.5s ease-in;
  -moz-transition: all 0.5s ease-in;
  transition: all 0.5s ease-in;

  &.showAni {
    left: 0px;
  }

  .project-item {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border-radius: 8px;
    height: 40%;
    width: 20%;
    margin: 30px 25px;
    background: #eeeeee;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    .icon-git {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      text-decoration: none;

      .iconBig {
        color: #2C9678;
        margin: 0 8px;
        height: 100%;
        align-items: center;
      }

      .link-str {
        line-height: 40px;
        margin-right: 20px;
        align-items: center;
        height: 100%;
        color: #2C9678;
      }
    }

    span {
      width: 80%;
      font-size: 10px;
      margin-top: 5px;
      text-align: center;
      margin: 0 auto;
    }
    .title {
      font-weight: 600;
      text-align: center;
    }
  }

  img {
    // border: 1px solid rgba(182, 108, 108, 0.01);
    // box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px 8px 0 0;
  }
}

@media screen and (max-width: 1100px) {
  .logo-title{
    display: none;
  }

  .iconfont{
    font-size: 0px;
  }
}
</style>
