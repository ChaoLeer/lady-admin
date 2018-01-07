/*
 * @Author: ChaoLeer
 * @Date: 2017-08-23 09:06:08
 * @Last Modified by: ChaoLeer
 * @Last Modified time: 2017-08-23 09:07:33
 * @Description: 表单组件，配置数组渲染，支持render渲染，特殊类可能需要自定制
 */
<template>
  <div class="climbformstyle">
      <template v-for="otItem in otTableDates">
          <template v-if="otItem.hide?otItem.hide[currentType]:true ">
            <Form-item v-if="!otItem.flag" :label="otItem.label" :prop="otItem.prop">
                <!--<Input :disabled="otItem.disabled?otItem.disabled[currentType]:false" v-if="otItem.type==='text' || otItem.type==='password' || otItem.type==='textarea'" :type="otItem.type"  v-model="otFormValidate[otItem.prop]" :autosize="{minRows: 2,maxRows: 5}"  :placeholder="otItem.placeholder"></Input>-->
                <template v-if="!otItem.fun">
                  <Input :disabled="otItem.disabled?otItem.disabled[currentType]:false"
                  v-if="otItem.type==='text' || otItem.type==='password' || otItem.type==='textarea'"
                  :type="otItem.type"
                  v-model="otFormValidate[otItem.prop]"
                  :autosize="{minRows: 2,maxRows: 5}"
                  :placeholder="otItem.placeholder"></Input>

                  <Select filterable :disabled="otItem.disabled?otItem.disabled[currentType]:false"
                  v-if="otItem.type === 'select'"
                  v-model="otFormValidate[otItem.prop]"
                  :placeholder="otItem.placeholder" >
                      <Option v-for="sItem, idx in otItem.options" :label="sItem.label" :value="sItem.value" :key="idx">
                        <span>{{ sItem.label }}</span>
                        <span style="float:right;color:#ccc">{{sItem.disc}}</span>
                      </Option>
                  </Select>
                </template>
                <template v-if="!!otItem.fun">
                  <Input :disabled="otItem.disabled?otItem.disabled[currentType]:false"
                  @on-focus="otItem.fun(otItem, otTableDates)"
                  v-if="otItem.type==='text' || otItem.type==='password' || otItem.type==='textarea'"
                  :type="otItem.type"
                  v-model="otFormValidate[otItem.prop]"
                  :autosize="{minRows: 2,maxRows: 5}"
                  :placeholder="otItem.placeholder"></Input>

                  <Select filterable :disabled="otItem.disabled?otItem.disabled[currentType]:false"
                   v-if="otItem.type === 'select'"
                   v-model="otFormValidate[otItem.prop]"
                   :placeholder="otItem.placeholder"
                   @on-change="otItem.fun">
                      <Option v-for="sItem, idx in otItem.options" :label="sItem.label" :value="sItem.value" :key="idx">
                        <span>{{ sItem.label }}</span>
                        <span style="float:right;color:#ccc">{{sItem.disc}}</span>
                      </Option>
                  </Select>
                </template>
                <Radio-group  :disabled="otItem.disabled?otItem.disabled[currentType]:false"
                v-if="otItem.type === 'radio'"
                v-model="otFormValidate[otItem.prop]">
                    <Radio v-for="rItem,idx in otItem.options" :key="idx" :label="rItem.label">{{rItem.value}}</Radio>
                </Radio-group>
                <Checkbox-group  :disabled="otItem.disabled?otItem.disabled[currentType]:false"
                v-if="otItem.type === 'checkbox'"
                v-model="otFormValidate[otItem.prop]">
                    <Checkbox v-for="cItem,idx in otItem.options" :key="idx"  :label="cItem.label"></Checkbox>
                </Checkbox-group>
                <Date-picker  :disabled="otItem.disabled?otItem.disabled[currentType]:false"
                :type="otItem.type"
                v-if="otItem.type === 'date' || otItem.type === 'daterange' || otItem.type === 'datetime' || otItem.type === 'datetimerange' || otItem.type === 'year' || otItem.type === 'month'"
                v-model="otFormValidate[otItem.prop]"
                :placeholder="otItem.placeholder"></Date-picker>
                <v-render v-if="otItem.renderFun" :item="otItem" :render="otItem.renderFun"></v-render>
            </Form-item>
            <Form-item v-else :label="otItem.label">
                <Row v-if="otItem.type === 'dategroup'">
                    <Col span="11">
                      <Form-item :prop="otItem.prop.pre.prop">
                      :disabled="otItem.disabled?otItem.disabled[currentType]:false"
                          <Date-picker  :disabled="otItem.prop.pre.disabled?otItem.prop.pre.disabled[currentType]:false" :type="otItem.prop.pre.type" :placeholder="otItem.prop.pre.placeholder" v-model="otFormValidate[otItem.prop.pre.prop]"></Date-picker>
                      </Form-item>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                      <Form-item :prop="otItem.prop.after.prop">
                          <Date-picker
                          :disabled="otItem.prop.after.disabled?otItem.prop.after.disabled[currentType]:false"
                          :type="otItem.prop.after.type" :placeholder="otItem.prop.after.placeholder" v-model="otFormValidate[otItem.prop.after.prop]"></Date-picker>
                      </Form-item>
                    </Col>
                </Row>
                <v-render v-if="otItem.renderFun" :item="otItem" :render="otItem.renderFun"></v-render>
            </Form-item>
          </template>
      </template>
    </div>
</template>
<script>
  import Render from '../base/render.js'
  export default {
    data () {
      return {
      }
    },
    components: {
      'v-render': Render
    },
    props: {
      otTableDates: {
        type: Array,
        default: function () {
          return []
        }
      },
      otFormValidate: {
        type: Object,
        default: function () {
          return {}
        }
      },
      currentType: {
        type: String,
        default: ''
      }
    },
    methods: {
      void: function () {}
    }
  }
</script>
