<template>
  <div class="navbar">
    <ul class="item">
      <i class="layui-icon layui-icon-face-smile home-icon" @click="goIndex">
        <span>MyProject</span>
      </i>
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
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import router from '../../router/index'

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

    const goIndex = () => {
      router.push('/project')
    }

    return {
      change,
      goIndex,
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
  color: #1e9fff;
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
  background: #04aa6d;
}
</style>
