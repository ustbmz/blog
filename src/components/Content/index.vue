<template>
  <div class="main">
    <Suspense>
      <template #default>
        <v-md-preview :text="text"></v-md-preview>
      </template>

      <template #fallback>
        loading
      </template>
    </Suspense>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import store from '@/store'
export default defineComponent({
  props: ['content'],
  setup () {
    return {
      text: computed(() => {
        return store.state.content
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
