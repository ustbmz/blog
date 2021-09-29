<template>
  <div class="main">
    <v-md-preview :text="text"></v-md-preview>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
export default defineComponent({
  props: ['content'],
  setup (props) {
    return {
      text: computed(() => {
        return props.content
      })
    }
  }
})
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 880px;
}
</style>
