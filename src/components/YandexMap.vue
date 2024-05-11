<template>
    <div class="tempmap"></div>
  </template>
  
  <script>
  /* eslint-disable */
  import "../plagins/yandex-maps";
  
  function init(crd) {
    new ymaps.Map("map", {
                  center: crd,
                  zoom: 10
              });
  }
  
  export default {
    data() {
      return {
        coord:this.coordinates
      };
    },
    props:{
      coordinates:{
        type:Array,
        required:true
      }
    },
    mounted() {
      ymaps.ready(init(this.coord));
    },
  };
  </script>
  
  <style scoped>
  
  </style>