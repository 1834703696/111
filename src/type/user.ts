export interface userInt{
       id:number
       nickName:string,
       role:roleInt[],
       userName:string
 }

 export interface roleInt{
      role:number
      roleName:string
 }


 //角色接口
interface RoleInt{
    authority:number[],
    roleId:number,
    roleName:string
}

interface selelistType{
    role:number,
    nickName:string,
 }

 //编辑接口

  //编辑的类型检查
interface activeType {
    id: number,
    nickName: string,
    role:number[],
    userName:string
}


export class userData{
    //用户列表
    list:userInt[]=[]

    //角色列表
    rolelist:RoleInt[]=[]

    //查询
   find:selelistType={
    role:0,
    nickName:'',
   }

   isshow=false

   //编辑内容

   editobj:activeType = {
    nickName:'',
    role:[],
    id:0,
    userName:''
   }

 }