<!--  eslint-disable  -->
<template>
    <div v-for="countrie in props.listCountries" :key="countrie.ccn3">
        
            <div class="countrie">
                <div class="countrie__items">
                    <div>
                        <h3 class="country__name" @click="clickBtn(countrie.ccn3)">{{countrie.name.common }}</h3>
                        
                        <a class="item" @click="clickBtn(countrie.ccn3)">
                        <h5>Описание...</h5>
                        </a>
                    </div>

                    <div style="display: flex;">

                    <button @click="toPage(countrie)" class="open-page-btn">Cтраница</button>
                    <button class="add__item" @click="store.addFavorites(countrie.area,countrie)">В избранное</button>
                    
                    </div>

                </div>
                
               
                <div class="description" v-if="click == countrie.ccn3 && countrie.ccn3 != undefined">

                    <div class="description__items">

                        <div class="flag_img">

                    <p>Флаг страны:</p>

                    <img :src="countrie.flags.svg" :alt="countrie.flags.alt" width="50px">

                    </div>

                    <div class="capital">
                        <p>Столица:</p>
                        
                        {{ countrie.capital == undefined || countrie.capital == null?'None':
                         countrie.capital[0]}}
                    </div>

                    <div class="population">
                        <p>Население:</p>
                        {{ countrie.population == undefined || countrie.population == null?'None':
                         countrie.population + ' чел.'}}
                    </div>

                    <div class="continent">
                        <p>Континент:</p>
                        {{ countrie.continents[0] == undefined || countrie.continents[0] == null?'None':
                         countrie.continents[0]}}
                    </div>
                
                    
                    </div>
                    <div id="map" style="width: 400px; height: 200px"> 
                        <YandexMap :coordinates="countrie.capitalInfo.latlng"/>
                    </div>
                </div>

                
            </div>
        
    </div>
    {{ console.log(props.listCountries) }}
    
        <Pagination_Btns :paginationBtns="paginationBtns"/>
    
    
</template>
<script setup>
import YandexMap from './YandexMap.vue';
import Pagination_Btns from './UI/BtnsPagination.vue';
import { defineProps, ref} from 'vue';
import { useMyStore } from '@/context';
import router from '@/router/router';


const store = useMyStore()

let click = ref()
const props = defineProps({
        listCountries:{
            type:Object,
            required:true
        },
        paginationBtns:{
            type:Object,
            required:true
        },

})

function clickBtn(ccn3){
    click.value == ccn3?click.value = null:click.value = ccn3
}

function toPage(country){
    router.push(`/country/${country.area}`)
    store.setPageCountry(country)
}

</script>

<style scoped>
    .countrie{
        width: 100%;
        min-height: 100%;
        border: 1px solid teal;
        border-radius: 5px;
        margin: 5px;
        padding: 5px;
    }
    .country__name{
        cursor: pointer;
    }
    .description{
        min-height: 100%;
        display: flex;
        margin: 10px 0 0 0;
    }
    .description__items{
        padding: 5px;
        width: 300px;
        background-color: rgb(233, 233, 233);
        border-radius: 5px;
    }
    .capital{
        margin: 10px 0 0 0;
    }
    .population{
        margin: 10px 0 0 0;
    }
    .continent{
        margin: 10px 0 0 0;
    }
    .item{
        text-decoration:none;
        color: black;
        cursor: pointer;
    }
    .countrie__items{
        display: flex;
        justify-content: space-between;
    }
    .add__item{
        color: white;
        cursor: pointer;
        border: 0px;
        border-radius: 4px;
        padding: 5px;
    }
    .open-page-btn{
        color: white;
        cursor: pointer;
        border: 0px;
        border-radius: 4px;
        padding: 5px;
        margin: 0 10px 0 0;
    }
    #map{
        margin: 10px 0 0 80px;
        border: 1px solid;
        border-radius: 2px;   
    }
    @media(max-width:830px){
        .description{
            display: block;
            margin: 20px 0 0 30px;
        }
        #map{
            margin: 60px 0 0 0;
            width: 310px !important;
        }
        .countrie{
            width: 95%;
        }
    }
    @media(max-width:480px){
        .open-page-btn{
            font-size: 12px;
        }
        .add__item{
            font-size: 12px;
            width: 85px;
        }
    }
</style>