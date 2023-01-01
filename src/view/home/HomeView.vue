<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="3" class="logo_box"><div class="grid-content ep-bg-purple" />
         <img src="../../assets/vue.svg" class="logo" >
        </el-col>
        <el-col :span="18"><div class="grid-content ep-bg-purple" />
           <h1>后台管理系统</h1>
        </el-col>
        <el-col :span="3" class="login"><div class="grid-content ep-bg-purple" />
         <el-button >退出登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="active"
        text-color="#fff"
        router
      >
       
        <el-menu-item :index="item.path" v-for="item  in list" :key="item.path">
         
          <span>{{item.meta.title}}</span>
        </el-menu-item>
        
      </el-menu>
     
      </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
 import {useRouter,useRoute} from 'vue-router'
 const router = useRouter();
 const list = router.getRoutes().filter(item=>item.meta.flag)
 const active = useRoute().path
</script>

<style scoped lang="scss">
  .el-header{
      height: 80px;
      text-align: center;
     background-color: #999;
     .logo_box{
        height: 80px;
        
         line-height: 80px;
         border-radius: 50%;
         background-color: #fff;
       
         .logo{
          width: 80px;
          height: 80px;
       
    }
     }
     
     h1{
        line-height: 80px; 
     }
     .login{
        line-height: 80px;
     }
  }
  .el-menu{
    height: calc(100vh - 80px);
  }
</style>