<template >
        
        <div class="wrap">
        <div class="container">
         
    <h1 style="margin: 0px auto; width: 400px;">Список избранных стран </h1>
    <div v-for="countrie in store.favorites" :key="countrie.area">
        <div class="countrie">
                <div class="countrie__items">
                    <div>
                        <h3>{{countrie.name.common }}</h3>
                        
                        <h5 class="desc__btn" @click="clickBtn(countrie.area)">Описание...</h5>
                        
                    </div>
                    <div style="display: flex;">

                    <button @click="toPage(countrie)" 
                    class="open-page-btn">
                    Cтраница
                    </button>

                    <button class="add__item" 
                        @click="store.removeFavorites(countrie.area)">
                        Удалить
                    </button>

                    </div>
                </div>
                
        
                <div class="description" v-if="click == countrie.area">

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

                    <div id="map" style="width: 400px; height: 200px" >
                        
                            <YandexMap :coordinates="countrie.capitalInfo.latlng"/>
                    </div>
                </div>

                
            </div>
     </div>
    </div>
</div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import YandexMap from '../components/YandexMap.vue';
import { useMyStore } from '@/context';
import router from '@/router/router';

const store = useMyStore()


let click = ref()

function clickBtn(area){
    click.value == area?click.value = null:click.value = area
}

function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
}
function toPage(country){
    router.push(`/country/${country.area}`)
    store.setPageCountry(country)
}

onMounted(()=>{

    if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }

})

</script>

<style scoped>
    .wrap{
        flex: 1;
    }
    .countrie{
        width: 80%;
        height: 100%;
        border: 1px solid teal;
        border-radius: 5px;
        margin: 20px auto;
        padding: 5px;
    }
    .description{
        min-height: 100%;
        display: flex;
        margin: 10px 0 0 0;
    }
    .description__items{
        width: 300px;
        background-color: rgb(233, 233, 233);
        border-radius: 5px;
        padding: 10px;
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
    .desc__btn{
        cursor: pointer;
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
</style>