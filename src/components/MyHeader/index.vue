<template>
  <div class="navbar">
    <i class="layui-icon layui-icon-face-smile home-icon" @click="togglePro()">
      <span>MyProject</span>
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
import { defineComponent, reactive, toRefs, computed } from 'vue'
import store from '@/store'

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
          name: 'Html'
        },
        {
          name: 'Css'
        },
        {
          name: 'JavaScript'
        },
        {
          name: 'LeetCode'
        },
        {
          name: 'Vue'
        },
        {
          name: 'Server'
        }
      ]
    })
    const change = item => {
      // eslint-disable-next-line vue/no-mutating-props
      state.catalog = item.name
      store.commit('setShowFlag', true)
      emit('update:catalog', state.catalog)
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

    return {
      change,
      show,
      hide,
      togglePro,
      isHover: computed(() => {
        return store.state.isHover
      }),
      changeProject,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';
@import '~@/assets/icon/iconfont.css';

.home-icon {
  position: absolute;
  left: 15px;
  font-size: 30px;
  color: #04aa6d;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  span {
    font-size: 16px;
    color: #fff;
    margin-left: 10px;
    align-items: center;
  }
}
.navbar {
  cursor: pointer;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  font-size: 17px;
  background-color: rgb(55, 56, 78);

  color: #f1f1f1;
  width: 100%;
  padding: 0;
  letter-spacing: 1px;
  font-family: 'Source Sans Pro', sans-serif;
  height: 54px;
  line-height: 54px;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: baseline;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  line-height: 50px;
  margin: 2px;

  li {
    padding: 0 20px;
  }
}

.avtive {
  background: rgb(114, 151, 75);
}

.projectlist {
  position: fixed;
  top: 55px;
  left: -120%; /* test fixed + scroll, on retire la position top */
  width: 100%;
  height: 340px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  z-index: 99;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
  opacity: 0.96;
  -webkit-transition: all 0.5s ease-in;
  -moz-transition: all 0.5s ease-in;
  transition: all 0.5s ease-in;

  &.showAni {
    left: -20px;
  }

  .project-item {
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    flex-flow: column nowrap;
    justify-content: space-between;
    border-radius: 8px;
    height: 80%;
    width: 20%;
    margin: 30px 25px;

    .icon-git {
      display: flex;
      justify-content: center;
      align-items: center;

      .iconBig {
        font-size: 24px;
        color: #04aa6d;
        margin: 0 8px;
        height: 100%;
        align-items: center;
      }

      .link-str {
        line-height: 40px;
        margin-right: 20px;
        align-items: center;
        height: 100%;
        color: #333;
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
    border: 1px solid rgba(182, 108, 108, 0.01);
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px 8px 0 0;
  }
}
</style>
