<template>
  <div class="footer">Footer</div>
  <div class="bt-footer">©2021 ustbmz. All rights reserved</div>
</template>

<script>
export default {
  name: 'myFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  min-height: 170px;
  bottom: 0;
  background-color: rgb(25, 26, 31);
}
.bt-footer {
  height: 60px;
  background-color: rgb(18, 18, 22);
  color: #fff;
  line-height: 60px;
  text-align: center;
}
</style>
