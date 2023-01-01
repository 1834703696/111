 
 import service  from ".";
 import {loginint} from '../type/login'
  
//  interface 
interface Promises<T=[]>{
    code:number,
    data:T
}

 export function login(data:loginint){
    return service({
        url:'/login',
        method:'post',
        data
    })
 }

 //商品列表
export function goods():Promise<Promises> {
    return service({
        url: '/getGoodsList',
        method: 'get',

    })
}

//用户列表
export function getUserList():Promise<Promises> {
    return service({
        url: '/getUserList',
        method: 'get',

    })
}

// 角色列表
export function role():Promise<Promises> {
    return service({
        url: '/getRoleList',
        method: 'get',

    })
}

