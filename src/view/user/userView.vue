<template>
<el-form :inline="true" :model="find" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="find.nickName" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="find.role">
        <el-option label="全部" :value="0" />
        <el-option :label="item.roleName" :value="item.roleId" v-for="item in rolelist" :key="item.roleId" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>


  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="nickName" label="名字" width="180" />
    <el-table-column prop="roleName" label="角色">
        <template #default="{row}">
           <el-button type="primary"   size="small"  v-for="item in row.role" :key="item.role">{{ item.roleName }}</el-button>
        </template>
    </el-table-column>  
    <el-table-column label="编辑">
        <template #default="{row}">
           <el-button type="primary" size="small" @click="changer(row)">编辑</el-button>
        </template>
    </el-table-column>  
  </el-table>

  <el-dialog v-model="isshow" title="修改资料" width="380px">
    <el-form :model="editobj">
      <el-form-item label="名字" :label-width="formLabelWidth">
        <el-input v-model="editobj.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-select multiple  v-model="editobj.role" placeholder="Please select a zone">
            <el-option :label="item.roleName" :value="item.roleId" v-for="item in rolelist" :key="item.roleId" />
       
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isshow = false">取消</el-button>
        <el-button type="primary" @click="Confirm">
        确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
 import {getUserList,role} from '../../request/api'
 import { onMounted, reactive, ref, toRefs,watch } from 'vue';
 import {userData,userInt} from '../../type/user'
  const data = reactive(new userData())
  const formLabelWidth = ref('40px');
 const getuserlists = ()=>{
    getUserList().then(res=>{
        if(res.code==200){
            data.list = res.data
             
        }
    })
 }

 const getRole = ()=>{
    role().then(res=>{
         if(res.code==200){
             data.rolelist =  res.data
              
         }
    })
 }
 
 onMounted(()=>{
    getuserlists();
    getRole();
 })

 //查询
 const onSubmit = ()=>{
    let arr:userInt[] = []
    if(find.value.nickName || find.value.role){
       if(find.value.nickName){
           arr = data.list.filter(item=>item.nickName.indexOf(find.value.nickName)!==-1)
       }
       if(find.value.role){

        arr = (find.value.nickName?arr:data.list).filter(item=>item.role.find(item=>item.role==find.value.role))
       }
    }else{
      arr = data.list
    }
    data.list = arr;
   console.log(111,arr);
   

    watch([()=>find.value.nickName,()=>find.value.role],()=>{
         if(find.value.nickName=='' || find.value.role==0){
            getuserlists();
         }
    })
 }

 //编辑
 const changer = (row:userInt)=>{
    isshow.value=true
    editobj.value={
        id:row.id,
        nickName:row.nickName,
        role:row.role.map((item:any)=>item.role),
        userName:row.userName
    }

 }
  
 //编辑确定后
 const Confirm = ()=>{
     let obj:any = data.list.find(item=>item.id == data.editobj.id)
     obj.nickName = data.editobj.nickName
     obj.role = data.rolelist.filter(item=>data.editobj.role.indexOf(item.roleId)!==-1)
     data.list.forEach((item,i)=>{
         if(obj.id ===item.id ){
            data.list[i] = obj  
         }
     })
    isshow.value=false
 }

 let {list,rolelist,find,isshow,editobj} = toRefs(data)
</script>

<style scoped>

</style>