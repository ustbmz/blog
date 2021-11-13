<template>
  <div class="navbar">
    <i class="layui-icon layui-icon-face-smile home-icon" @click="togglePro()">
      <span>MyProject</span>
    </i>
    <ul class="item" :class="{ showItem: isHover }">
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
    <ul class="item" :class="{ showItem: !isHover }">
      <li
        v-for="item in projects"
        :key="'item' + item.name"
        :class="{ avtive: catalog === item.name }"
        @click="changeProject(item.index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <div class="projects" :class="{ showdiv: isHover }" @mouseleave="hide()">
    <span class="pj-name">{{ projects[showIndex].name }}</span>
    <div class="bbs" v-show="showIndex === 0">
      <div class="contractions">
        <img src="@/assets/bbs.png" />
        <img src="@/assets/bbs.png" />
        <img src="@/assets/bbs.png" />
        <img src="@/assets/bbs.png" />
        <img src="@/assets/bbs.png" />
      </div>
      <img src="@/assets/bbs.png" />
    </div>
    <div class="bbs2" v-show="showIndex === 1"></div>
    <div class="webapp" v-show="showIndex === 2"></div>
    <div class="admin" v-show="showIndex === 3"></div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed, Onmounted } from 'vue'
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
      hoverContral: '',
      showIndex: 0,
      projects: [
        {
          index: 0,
          name: 'BBS 论坛',
          github: 'https://github.com/ustbmz/front',
          demo: 'http://bbs.ustbmz.com/'
        },
        {
          index: 1,
          name: 'BBS 论坛(Vue3)',
          github: 'https://github.com/ustbmz/front-v3',
          demo: 'http://v3.ustbmz.com/'
        },
        {
          index: 2,
          name: 'webapp H5移动端',
          github: 'https://github.com/ustbmz/webapp',
          demo: 'http://webapp.ustbmz.com/'
        },
        {
          index: 3,
          name: 'admin 后台系统',
          github: 'https://github.com/ustbmz/admin',
          demo: 'http://admin.ustbmz.com/'
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
      clearTimeout(state.hoverContral)
      state.hoverContral = setTimeout(() => {
        store.commit('setIsHover', !store.state.isHover)
      }, 200)
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

.projects {
  display: none;
  opacity: 1;
  position: absolute;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  top: 65px;
  left: 10px;
  width: 99%;
  height: 80%;
  z-index: 9998;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;

  .bbs {
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    .contractions {
      box-shadow: 0;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      width: 15%;
      height: 80%;
      overflow: hidden;
      margin-left: 20px;
      img {
        border: 1px solid rgb(114, 151, 75);
        width: 50%;
        height: auto;
        margin: 0 auto;
      }
    }

    img {
      height: 80%;
      margin: 15px;
    }
  }
}
.showdiv {
  display: flex;
}
.showItem {
  display: none;
}
</style>
