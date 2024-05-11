 <!-- eslint-disable  -->
<template>
    <div class="wrapper">
        <h1>Список стран</h1>
            
            <div class="faforites" @click="$router.push('/favorites')">
                <span>{{ store.favorites.length < 1?0:store.favorites.length }}</span>
                <img src="@/assets/incon-hear.png" alt="heart" class="heart">
            </div>

            

            <input :value="valueInput" 
            @input="valueInput = $event.target.value" 
            type="text" 
            placeholder="Поиск по названию"
            class="search-input">

            <button @click="searchCountrie" class="search-btn">Поиск</button>

            <select v-model="optionValue" class="sort-select" @change="filterCountry">
                <option value="null">По населению</option>
                <option value="1000000">от 0 до 1 млн. чел.</option>
                <option value="10000000">до 10 млн. чел.</option>
                <option value="15000000">до 15 млн. чел.</option>
                <option value="50000000">до 50 млн. чел.</option>
                <option value="150000000">до 150 млн. чел.</option>
                <option value="150000010">от 150 млн. чел.</option>
            </select>
           
            <Countrie :listCountries="listCountries" :paginationBtns="paginationBtns"
            />


    </div>
</template>


<script setup>
import { onMounted, watch} from 'vue';
import Countrie from './Country.vue'
import { useMyStore } from '@/context'
import { ref } from 'vue';

const store = useMyStore()

let listCountries = ref([])
let paginationBtns = ref(1)
let valueInput = ref('')
let optionValue = ref('null')


function filterCountry(){
    if(optionValue.value == "null"){
        changePage(1)
        return
    }
    
    fetchCountries().then(el=>{
        let result = []
        
        if(optionValue.value == 1000000){
            result = el.filter((a)=>a.population < 1000000)
        }
        if(optionValue.value == 10000000){
            result = el.filter((a)=>a.population < 10000000 && a.population > 1000000)
        }
        if(optionValue.value == 15000000){
            result = el.filter((a)=>a.population < 15000000 && a.population > 10000000)
        }
        if(optionValue.value == 50000000){
            result = el.filter((a)=>a.population < 50000000 && a.population > 15000000)
        }
        if(optionValue.value == 150000000){
            result = el.filter((a)=>a.population < 150000000 && a.population > 50000000)
        }
        if(optionValue.value > 150000000){
            result = el.filter((a)=>a.population > 150000000)
        }
        
        listCountries.value = result
    })
}

function searchCountrie(){
    if(valueInput.value == '')return
    fetchCountries().then((el)=>{

        let result = el.filter((e)=> e.name.common.toLowerCase() == valueInput.value.toLowerCase())

        if(result.length < 1){
            result = el.filter((e)=> e.name.common.toLowerCase().split('')[0] == valueInput.value.toLowerCase().split('')[0])
        }
        listCountries.value = result
        
    })
}

async function fetchCountries(){

        let result = await fetch('https://restcountries.com/v3.1/all',{
            method:'GET'
        })

        if (result.ok) { 
            let json = await result.json()
            
            
            return json
        } else {
            console.log("Ошибка HTTP: " + result.status);
        }
}
watch(()=>store.activeBtn,()=>{
    changePage(store.activeBtn)
})
onMounted(()=>{

    fetchCountries().then(el=>{
         const result = []
         for(let i = 0; i < store.startPage; i++){
            
            if(el[i] === undefined)break
             
            result.push(el[i])
         }
        listCountries.value = result
        paginationBtns.value = Math.ceil(el.length / 15)
     })

})

function changePage(btn){
    fetchCountries().then(el=>{
        const result = []
        let end = btn * 15
        let start = end - 15
        for(let i = start; i < end; i++){
            if(el[i] === undefined)break
             
            result.push(el[i])
        }
        listCountries.value = result
    })
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .faforites{
        margin: 0 0 0 90%;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
    }
    .faforites span{
        color: white;
        width: 20px;
        height: 20px;
        position: absolute;
        margin: -8px 0 0 12px;
        background-color: red;
        border-radius: 50%;
        opacity: 90%;
    }

    .wrapper{
        margin: 0 auto;
        width: 800px;
        min-height: 100%;
    }
    .search-input{
        padding: 10px;
        border-radius: 4px;
        border: 1px solid;
    }
    .search-btn{
        margin: 0 0 0 10px;
        color: white;
        font-size: Roboto;
        padding: 10px;
        border: 0px;
        border-radius: 4px;
        cursor: pointer;
    }
    .sort-select{
        display: block;
        margin: 5px 0 10px 0;
        border-radius: 4px;
        border: 1px solid;
    }
    @media(max-width:840px){
        .wrapper{
            width: 100%;
        }
        .faforites{
            margin: 0 0 0 87%; 
        }
    }
</style>