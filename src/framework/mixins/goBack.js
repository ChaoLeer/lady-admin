/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 11:09:24
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 11:12:32
 * @Description: 返回方法
 */
export default{
  methods: {
    goBack: function (n) {
      n & n < 0
      ? this.$router.go(n)
      : this.$router.go(-1)
    }
  }
}
