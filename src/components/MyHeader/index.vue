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
  <!-- <div class="projects" @mouseleave="hide()">
    <div class="contractions" v-for="item in projects" :key="item.index">
      <img :src="item.pic" />
      <div>item.name</div>
      <div>item.github</div>
      <div>item.demo</div>
    </div>
  </div> -->
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
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  width: 90%;
  height: 200px;
  margin: 0 auto;
  margin-top: 70px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  text-align: center;

  .contractions {
    display: flex;
    flex-flow: columns nowrap;
    justify-content: center;
    height: 100%;
    margin: 20px;
  }
  span {
    display: inline-block;
  }
}
</style>
