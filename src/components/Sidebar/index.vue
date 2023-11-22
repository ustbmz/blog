<template>
  <div>
    <div class="sider">
      <div class="title-name tipline">{{ catalog }}</div>
      <div class="select">
        <ul>
          <li
            @click="changeShowFlag(true)"
            :class="{ activeItem: showFlag === true }"
          >
            <i class="iconfont icon-fenleimulu" style="font-size: 22px"></i>
            <span class="ml1">目录</span>
          </li>
          <li
            @click="changeShowFlag(false)"
            :class="{ activeItem: showFlag === false }"
          >
            <i class="iconfont icon-shuqian1" style="font-size: 22px"></i>
            <span class="ml1">书签</span>
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
              itemTitleList.length > 2 &&
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
import store from "@/store";
import {
  defineComponent,
  computed,
  reactive,
  watch,
  onMounted,
  toRefs
} from "vue";
import { ScrollToElem } from "@/utils/common.js";
import { moment } from "@/utils/memont";

export default defineComponent({
  props: ["titlelist"],
  setup(props, { emit }) {
    const state = reactive({
      clickname: "",
      scrollHeight: 0
    });

    const itemTitleList = computed(() => {
      return props.titlelist;
    });

    const changeShowFlag = val => {
      store.commit("setShowFlag", val);
    };
    const changeContent = item => {
      ScrollToElem(".container", 500, -65);
      store.commit("setMDitem", item);
      store.commit("setContentName", item.title);
    };
    const handleAnchorClick = item => {
      state.clickname = item.title;
      emit("handleAnchorClick", item);
    };

    const onScroll = () => {
      const docScrollTop =
        document.documentElement && document.documentElement.scrollTop;
      state.scrollHeight = docScrollTop + 200;

      if (docScrollTop > 1000 && store.state.topFlag) {
        setTimeout(() => {
          store.commit("setTopFlag", false);
        }, 2000);
      }
      if (docScrollTop < 1000 && !store.state.topFlag) {
        setTimeout(() => {
          store.commit("setTopFlag", true);
        }, 2000);
      }
    };

    watch(
      () => {
        return state.scrollHeight;
      },
      (newval, oldval) => {
        console.log("🚀 ~ file: index.vue ~ line 118 ~ setup ~ oldval", oldval);
        console.log("🚀 ~ file: index.vue ~ line 118 ~ setup ~ newval", newval);

        if (!store.state.showFlag) {
          const el = document.querySelector(".scrollActive");
          if (el && el !== undefined && el !== null) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest"
            });
          }
        }
      }
    );

    onMounted(() => {
      window.addEventListener("scroll", onScroll, false);
    });

    return {
      ...toRefs(state),
      moment,
      itemTitleList,
      changeShowFlag,
      handleAnchorClick,
      lists: computed(() => {
        return store.state.mdlists;
      }),
      changeContent,
      catalog: computed(() => {
        return store.state.title.toUpperCase();
      }),
      contentName: computed(() => {
        return store.state.contentname;
      }),
      showFlag: computed(() => {
        return store.state.showFlag;
      })
    };
  }
});
</script>

<style lang="scss" scoped>
$primary-color: #2c9678;

@keyframes showHeader {
  0% {
    opacity: 0%;
  }
  40% {
    opacity: 45%;
  }
  100% {
    opacity: 100%;
  }
}

.sider {
  height: 570px;
  margin: 2px;
  // animation: showHeader 2s;
  background: #ffffff;
  overflow-y: scroll;
  color: #666;
  z-index: 2;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .title-name {
    text-align: center;
    font-size: 16px;
    line-height: 60px;
    color: #fff;
    background-color: #a4cab6;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px;
  }

  .nav-item {
    padding-left: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row nowrap;
    text-overflow: ellipsis;
    min-height: 50px;
    transition: #fff 0.3s;
    &.active {
      background: linear-gradient(
        to right,
        rgb(235, 214, 113),
        rgb(238, 239, 240)
      ); /* 标准的语法 */
      // border-right: 2px solid #EBD671;
    }
    .nav-time {
      width: 16%;
      margin-top: 6px;
      padding-right: 4px;
      font-size: 12px;
      color: #2c9678;
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
      font-size: 12px;
      min-height: 26px;
      transition: rgb(117, 86, 86) 0.3s;
      &.scrollActive {
        background: linear-gradient(
          to right,
          rgb(235, 214, 113),
          rgb(238, 239, 240)
        );
        // opacity: 0.8;
        // border-right: 2px solid #EBD671;
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
    height: 60px;
    li {
      width: 50%;
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
  width: 50%;
  border-bottom: 1px solid $primary-color;
  &:after {
    position: absolute;
    display: inline-block;
    content: "";
    width: 20px;
    height: 4px;
    background: $primary-color;
    bottom: 0px;
    right: 0px;
    opacity: 0.4;
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
