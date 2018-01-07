/**
 * @title: 404页面
 * @description: 404页面
 * @author: TiuWeb
*/
<template>
  <div class="climb-not-found nfound">
    <h1>404找不到</h1>
    <img :src="imgUrl" alt="not found">
    <!-- <Button @click="back" type="primary">返回</Button> -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imgUrl: require('@/assets/img/404.svg')
      }
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nfound {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    padding-top: 20%;
    h1 {
      width: 100%;
      /*color: #fff;*/
      text-align: center;
    }
    .ivu-button {
      width: 120px;
    }
  }
</style>
