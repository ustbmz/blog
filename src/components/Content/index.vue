<template>
  <div class="main">
    <v-md-preview :text="text"></v-md-preview>
    <button @click="readfile">获取MD文件源码</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {
      text: '# this is MD title'
    }
  },
  methods: {
    readfile () {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      var fs = require('fs')
      const buf = fs.readFileSync(
        'D:\\Project\\blog\\src\\components\\common\\Docker.md'
      )
      const data = fs.readFileSync(
        'D:\\Project\\blog\\src\\components\\common\\Docker.md',
        'utf8'
      )
      console.log(buf) // <Buffer 48 65 6c 6c 6f>
      console.log(data) // Hello
      this.text = data
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
