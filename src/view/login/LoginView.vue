<template>
    <div class="login_box">
      <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="60px"
    class="demo-ruleForm"
  >
  <h2>后台管理系统</h2>
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username" placeholder="请输入"/>
    </el-form-item>
    <el-form-item label="密码" prop="password" >
      <el-input
      placeholder="请输入"
        v-model="ruleForm.password"
        autocomplete="off"
        type="password"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
      class="login"
        >登录</el-button
      >
      <el-button @click="resetForm(ruleFormRef)"    class="login">重制</el-button>
    </el-form-item>
  </el-form>
    </div>
</template>

<script setup lang="ts">
   import { reactive, toRefs,ref } from 'vue'
import {loginData} from '../../type/login'
import type { FormInstance } from 'element-plus'
import {login} from '../../request/api'
import {useRouter} from 'vue-router'
const router = useRouter();
const ruleFormRef = ref<FormInstance>()
    
   const data = reactive(new loginData())
  
   const rules = reactive({
    username: [
    { required: true, message: '输入内容不能为空', trigger: 'blur' },
    { min: 5, max: 10, message: '输入的长度为5到10', trigger: 'blur' },
  ],
    password: [
    { required: true, message: '输入内容不能为空', trigger: 'blur' },
    { min: 5, max: 10, message: '输入的长度为5到10', trigger: 'blur' },
  ],

   })
     //确定
   const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login(ruleForm.value).then(res=>{
       if(res.data.code==200){
            localStorage.setItem('token',res.data.token);
            router.push('/')
       }else{
           Promise.reject(res.data)
       }
      })
    }
     else {
      console.log('error submit!')
      return false
    }
  })
}
  //取消
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


   let {ruleForm} = toRefs(data)
</script >

<style scoped lang="scss">
.login_box{
     width: 100%;
     height: 100%;
     background: url(../../assets/logincopy.png) no-repeat center;
     background-size: 100% 100%;
     position: relative;
     .demo-ruleForm{
           width: 500px;
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%,-50%);
           background-color: #fff;
           padding: 20px;
           padding-left: 10px;
     }
     .login{
        width: 48%;
     }
     h2{
      text-align: center;
      margin-bottom: 20px;
     }
}
</style>