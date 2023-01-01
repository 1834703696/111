<template>
 <el-form :inline="true" :model="find">
    <el-form-item label="名称">
      <el-input v-model="find.title" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="详情">
        <el-input v-model="find.introduce" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>



  <el-table :data="datalist.list" border style="width: 100%">
    <el-table-column prop="id" label="Date" width="180" />
    <el-table-column prop="title" label="Name" width="180" />
    <el-table-column prop="introduce" label="Address" />
  </el-table>

  <el-pagination layout="prev, pager, next"   :total="find.count * 2" @size-change="sizeChange" @current-change="currentChange" />

</template>

<script setup lang="ts">
   import { reactive, toRefs,onMounted, computed, watch } from 'vue';
import {goods} from '../../request/api'
   import {goodsData,goodsint} from '../../type/goods'
   const data = reactive(new goodsData());

   function goodslist(){
    goods().then(res=>{
    if(res.code==200){
      data.list = res.data
      data.find.count = res.data.length;
    }
   })
   }
   onMounted(()=>{
    goodslist()
   })

//分页

const datalist = reactive({
    list:computed(()=>{
         return data.list.slice((data.find.page-1)*data.find.pagesize,data.find.page * data.find.pagesize)
    })
})

//查询

const onSubmit = ()=>{
     let arr:goodsint[] = []
    if(find.value.title || find.value.introduce){
       if(find.value.title){
           arr = data.list.filter(item=>item.title.indexOf(find.value.title)!==-1)
       }
       if(find.value.introduce){
        arr = (find.value.title?arr:data.list).filter(item=>item.introduce.indexOf(find.value.introduce)!==-1)
       }
    }else{
      arr = data.list
    }
    data.list = arr;
    data.find.count  = arr.length;

    watch([()=>find.value.title,()=>find.value.introduce],()=>{
         if(find.value.title=='' && find.value.introduce==''){
            goodslist()
         }
    })
}


const sizeChange = (pagesize:number)=>{
    data.find.pagesize =  pagesize
}

const currentChange = (page:number)=>{
    data.find.page =  page
}


   let {list,find} = toRefs(data)
</script>

<style scoped>

</style>