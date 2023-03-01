<template>
  <el-form :inline='true' class="demo-form-inline" :model="form" :rules="rules" ref="form">
      <template v-for="item in formItemProp">
          <el-form-item :key="item.prop" :label="item.label" v-if="item.prop !== 'handle'" :prop="item.prop">
              <slot :name="item.label" :slot-scope="{formItemProp, form, target:item}">
                  <el-input v-if="item.itemProp.type=='input'" v-model="form[item.prop]" :placeholder="item.itemProp.placeholder"></el-input>
                  <el-select v-if="item.itemProp.type=='select'" v-model="form[item.prop]" :placeholder="item.itemProp.placeholder">
                      <el-option v-for="option in item.itemProp.selectProp" :label=" option.label" :value="option.value" :key="option.id || option.value || option.label"/>
                  </el-select>
                  <el-date-picker v-if="item.itemProp.type=='time'" v-model="form[item.prop]" :placeholder="item.itemProp.placeholder" v-bind="item.itemProp.timeParam"/>
              </slot>
          </el-form-item>
          <slot  v-else-if="item.prop=='handle'" :name="item.label" :slot-scope="{ formItemProp , form}">
              <el-button 
              :type="item.handleProp.type == 'reset' ? 'danger' : 'primary' " 
              :key="item.prop" 
              :icon="item.handleProp.type == 'search' ? 'el-icon-search' : ''"
              @click="handleEvent(item.handleProp.type)"
              >
              {{ item.label }}
              </el-button>
          </slot>
      </template>
  </el-form>
</template>

<script>
export default {
    props:{
        formProp:{
            type: Object,
            default() {
                return {}
            }
        },
        formItemProp:{
            type: Array,
            default() {
                return []
            }
        },
        rules:{
            type: Object,
            default() {
                return {}
            }
        },
    },
    
    data () {
        return {
            form:{},
        }
    },
    created() {
      this.setRules(this.formItemProp)
      console.log(this.formItemProp,'formItemProp');
    },
    mounted() {
    },
    methods:{
        handleEvent(eventType){
            if(eventType=='reset'){
                this.handleReset()
            }
        },
        setRules(formItemProp){
        },
        handleReset(){
            this.form={}
        },
        validate(){
            let res
            this.$refs.form.validate((val)=>{
                res=val
            })
            return res
        }
    }
}
</script>