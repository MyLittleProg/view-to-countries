import { defineStore } from "pinia";

export const useMyStore = defineStore('myStore',{
    state:()=>({
        activeBtn:1,
        startPage:15,
        favorites:[],
        pageCountry:{}
    }),
    getters:{
        
    },
    actions:{
        changeActiveBtn(btn){
            this.activeBtn = btn   
        },
        addFavorites(id,obj){
            let res = false
            this.favorites.forEach((el)=>{
                if(el.area == id){
                    res = true
                }
            })
            if(!res){
                this.favorites.push(obj)
            }
        
        },
        removeFavorites(id){
            this.favorites.forEach((el,index)=>{
                if(el.area == id){
                    this.favorites.splice(index,1)
                }
            })
        },
        setPageCountry(obj){
            this.pageCountry = obj
        }
    }
})