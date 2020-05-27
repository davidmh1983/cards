<template>
  <div class="combos">
    <label class="combos-title"> Combos: </label>
    <div v-for="(item,index) in list" :key="index"> {{ item }} </div>
    <label v-if="list.length === 0"> No Combinations </label>
  </div>
</template>

<script>
export default {
  name: 'Combos',
  props: {
    list: Array
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.medium {
  width: 100px;
}
.small {
  width: 50px;
}
.combos-title{
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
  display: inline-block;
}
</style>
