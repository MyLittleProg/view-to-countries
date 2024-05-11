
<template>
    <div class="wrapp"> 
    <div class="container">
<div class="country" v-if="store.pageCountry.name != undefined">
    <h1>Детальная информация о стране</h1>
    <br>
    <br>
    <h2>{{store.pageCountry.name.common }}</h2>
    <br>

    <div class="about">

                <ul>
                    <div class="about_half1" style="display: flex;">
                    <li class="off-name">Офиц. название</li>
                    <li class="flag">Флаг</li>
                    <li class="capit">Столица</li>
                    <li class="lang">Язык</li>
                    </div>
                    <div class="about_half2" style="display: flex;">
                    <li class="population">Население</li>
                    <li class="hour">Часовой пояс</li>

                    <li class="valute">Валюта</li>
                    </div>
                </ul>

             
    </div>
    <!-- Mobil -->

    <div class="about_mob" style="display: none;">

        <ul>
            
            <li class="off-name"><strong>Офиц. название:</strong><br>
            <p>{{ store.pageCountry.name.official }}</p></li>
            <li class="flag"><strong>Флаг:</strong>
                <img width="50px" height="25px" :src="store.pageCountry.flags.svg" alt="flag">
            </li>
            <li class="capit"><strong>Столица:</strong>
                <p>
                    {{ store.pageCountry.capital[0] }}
                </p>
            </li>
            <li class="lang"><strong>Язык:</strong>
                <p>
                    {{ Object.values(store.pageCountry.languages)[0] }}
                </p>
            </li>
            <li class="population"><strong>Население:</strong>
                <p>
                    {{ store.pageCountry.population }} чел.
                </p>
            </li>
            <li class="hour"><strong>Часовой пояс:</strong>
                <p>
                    {{ store.pageCountry.timezones.join(', ') }}
                </p>
            </li>
            <li class="valute"><strong>Валюта:</strong>
                <p>
                    {{  Object.values(store.pageCountry.currencies)[0].name}}
                </p>
            </li>
            
        </ul>


    </div>
    <br>
    <div class="about-info">
        <ul>
            <div class="half-1" style="display: flex;">
            <li class="about-info__off-name">{{ store.pageCountry.name.official }}</li>
            <li class="about-info__flag"><img width="50px" height="25px" :src="store.pageCountry.flags.svg" alt="flag"></li>
            <li class="about-info__capit">{{ store.pageCountry.capital[0] }}</li>
            <li class="about-info__lang">{{ Object.values(store.pageCountry.languages)[0] }}</li>
            </div>
            <div class="half-2" style="display: flex;">
            <li class="about-info__population">{{ store.pageCountry.population }} чел.</li>
            <li class="about-info__hour">{{ store.pageCountry.timezones[0] }}</li>
            <!-- <li class="about-info__continent">{{store.pageCountry.continents[0]}}</li> -->
            <li class="about-info__valute">{{  Object.values(store.pageCountry.currencies)[0].name}}</li>
            </div>   
        </ul>
    </div>


    <br>
    <h2>Карта</h2>
    <br>
    <div id="map" style="width: 400px; height: 200px" >
                        <YandexMap :coordinates="store.pageCountry.capitalInfo.latlng"/>
    </div>
</div>
</div>
</div>
</template>

<script setup>
import YandexMap from '@/components/YandexMap.vue';
import { useMyStore } from '@/context';
import router from '@/router/router';
import { onMounted, ref } from 'vue';
/* eslint-disable */

const store = useMyStore()



onMounted(()=>{

    if(store.pageCountry.name === undefined){

        router.push('/')
    }

})

</script>

<style scoped>
    .wrapp{
        flex:1;
    }
    .half-1 li{
        margin-right: 35px;
    }
    .half-2 li{
        margin-right: 20px;
    }
    .half-2{
        width: 400px;
    }
    .about_half1 li{
        margin-right: 35px;
    }
    .about_half2 li{
        margin-right: 30px;
    }
    .about_half2{
        width: 400px;
    }
    .country{
        margin: 50px auto;
        width: 1000px;
        height: 100%;
        border: 1px solid teal;
        border-radius: 5px;
        padding: 15px;
    }
    .about{
        background-color: rgb(243, 243, 243);
        border-radius: 4px;
        padding: 2px 0px 2px 2px;
    }
    .about ul{
        margin: 10px;
        display: flex;
        justify-content: space-between;
        list-style: none;
    }
    .about-info ul{
        margin: 10px;
        display: flex;
        justify-content: space-between;
        list-style: none;
    }
    .off-name{
       width: 145px; 
    }
    .flag{
        width: 50px;
    }
    .capit{
        width: 70px;
    }
    .lang{
        width: 45px;
    }
    .population{
        width: 100px;
    }
    .hour{
        width: 102px;
    }
    .continent{
        width: 80px;
    }
    .value{
        width: 100px;
    }
    .about-info__off-name{
        width: 145px;
    }
    .about-info__flag{
        width: 50px;
    }
    .about-info__capit{
        width: 70px;
    }
    .about-info__lang{
        width: 75px;
    }
    .about-info__population{
        width: 140px;
    }
    .about-info__hour{
        width: 102px;
    }
    .about-info__continent{
        width: 80px;
    }
    .about-info__value{
        width: 100px;
    }
    .about_mob{
        background-color: rgb(243, 243, 243);
        border-radius: 4px;
        padding: 2px 0px 2px 2px; 
        width: 300px;
    }
    .about_mob ul{
        list-style: none;
    }
    @media(max-width:1010px){
        .country{
            width: 95%;
        }
    }
    @media(max-width:950px){
        .about{
            display: none;
        }
        .about-info{
            display: none;
        }
        .about_mob{
            display: block !important;
        }
        .about_mob ul .hour strong{
            box-sizing: border-box;
            display: block;
            width: 116px;
        }
        .about_mob ul li p{
            margin: 5px 0 0 10px;
            width: 200px;
        }
    }
    @media(max-width:860px){
        #map{
            width: 310px !important;
        }
    }
</style>