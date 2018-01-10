/*
 * @Author: ChaoLeer
 * @Date: 2017-09-19 16:34:58
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-09-19 16:36:24
 * @Description: api请求基础配置,在此处可以进行cache提示时间设置
 */
import axios from 'axios'
import {getStorageValue} from '../framework/common/storage'
// import vm from '../main.js'
import Vue from 'vue'

const cacheMessageDuration = 5
const vm = new Vue()
function message (msg, duration) {
  if (global.cacheMessage) {
    vm.$Message.warning(msg, duration)
  }
}
function createAxios (baseUrl) {
  let headers = {
    'usertoken': getStorageValue('local', 'user').usertoken,
    'userid': getStorageValue('local', 'user').id
  }
  if (global.orgid) {
    headers['orgid'] = getStorageValue('local', 'user').orgid
  }
  let instance = axios.create({
    baseURL: baseUrl,
    headers: {
      ...headers
    }
  })
  instance.interceptors.request.use(
    function (config) {
      vm.$Spiner.start()
      // Do something before request is sent
      return config
    },
    function (error) {
      vm.$Spiner.finish()
      // Do something with request error
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    function (res) {
      vm.$Spiner.finish()
      return res
    },
    function (res) {
      vm.$Spiner.finish()
      message(res.response.data.message, cacheMessageDuration)
      if (res.response.data.code === '0') {
        if (res.response.data.message.indexOf('重新登录') > 0) {
          window.location.href = global.loginHost + '#/login'
        }
        message(res.response.data.message, cacheMessageDuration)
      }
      return Promise.reject(res)
    }
  )
  return instance
}
// 单点登录系统地址为下面配置的bseURL
var apiSSOBaseConfig = createAxios(global.apiSSOBaseConfigURL)
var apiBaseConfig = createAxios(global.apiBaseConfigURL)

export {
  apiSSOBaseConfig,
  apiBaseConfig
}
