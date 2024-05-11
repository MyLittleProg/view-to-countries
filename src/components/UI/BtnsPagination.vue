<template>
    <div class="pagination">
        <div v-for="count in props.paginationBtns" :key="count">
            <button 
            class="btn active__btn" 
            v-if="count === store.activeBtn"
            @click="store.changeActiveBtn(count)">
            {{ count }}
            </button>

            <button 
            class="btn" 
            v-if="count != store.activeBtn"
            @click="store.changeActiveBtn(count)"
            >{{ count }}
            </button>
        </div>
    </div>
    
</template>

<script setup>
import { defineProps } from 'vue';
import { useMyStore } from '@/context';

const store = useMyStore()

const props = defineProps({
    paginationBtns:{
            type:Number,
            required:true
        }
})

</script>

<style scoped>
    .pagination{
        display: flex;
        justify-content: space-around;
    }
    .btn{
        width: 25px ;
        height: 25px ;
        border:1px solid;
        border-radius: 45%;
        background: transparent;
        cursor: pointer;
    }
    .active__btn{
       width: 30px ;
       height: 30px ;
       background-color: rgb(221, 221, 221) ;
    }
    @media(max-width:830px){
        .btn{
            width: 18px;
            height: 18px;
        }
        .active__btn{
            height: 25px;
            width: 25px;
        }
    }
    @media(max-width:480px){
        .btn{
            border: 0px;
            width: 10px;
            height: 10px;
        }
        .pagination{
            width: 95%;
            justify-content:space-around;
        }
        .active__btn{
            width: 20px ;
            height: 20px ;
            background-color: rgb(221, 221, 221) ;
        }
    }
</style>