<template>
  <div class="footer">
    <!-- <div class="links">
      <ul>
        <li>友情链接1</li>
        <li>友情链接2</li>
        <li>友情链接3</li>
        <li>友情链接4</li>
      </ul>
    </div> -->
    <div class="bt-footer"><p>©2021 ustbmz. All rights reserved</p></div>
  </div>
</template>

<script>
export default {
  name: 'myFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  position: sticky;
  height: 60px;
  width: 100%;
  background-color: #111111;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  color: #fff;
  z-index: 1999;

  .links {
    margin-top: 60px;
    height: 120px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
  }
}
.bt-footer {
  color: rgba(255, 255, 255, 0.5);
  position: relative;
  height: 168px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-size: 0.875em;
  p {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
  line-height: 30px;
}
</style>
