<template>
  <router-view />
</template>

<style lang="scss">
@import '@/assets/styles/_variables.scss';
body {
  font-family: Verdana, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  background: #f7f7fc;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

a .body {
  text-decoration: none;
  color: #fff;
}

@for $i from 0 to 5 {
  .pd#{$i} {
    padding: $i * 10 + px;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px;
  }
  .pt#{$i} {
    padding-top: $i * 10 + px;
  }
  .pb#{$i} {
    padding-bottom: $i * 10 + px;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px;
  }
  .mg#{$i} {
    margin: $i * 10 + px;
  }
}

.text-center {
  text-align: center;
}

a{
  text-decoration:none;
}
</style>
