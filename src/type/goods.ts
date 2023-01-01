export interface goodsint{
   id:number,
   introduce:string,
   title:string,
   userId:number 
}
 interface  findInt {
    
    introduce:string,
    title:string,
    page:number,
    pagesize:number,
    count:number,

 }

export class goodsData{
    list:goodsint[] = [];

    find:findInt={
        introduce:'',
        title:'',
        page:1,
        pagesize:5,
        count:0,
    
    }
}