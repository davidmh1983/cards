<template>
  <div class="card">
    <div class="normal">
      <span class="card-value">{{ code.split('')[0] }}</span>
      <img :src="getImage" height="20px" width="20px"/>
    </div>
    <div class="mirror">
      <span class="card-value">{{ code.split('')[0] }}</span>
      <img :src="getImage" height="20px" width="20px"/>
    </div>
  </div>

  <!--<div class="card">
    <img :src="`https://deckofcardsapi.com/static/img/${code}.png`" :class="size"/>
  </div>-->
</template>

<script>
export default {
  name: 'Card',
  props: {
    code: String,
    size: String
  },
  computed: {
    getImage() {
      return require("../assets/" + this.code.split('')[1] + ".png")
    }
  }
}
</script>

<style scoped>
.normal {
  height: 50%;
  text-align: left;
}
.mirror{
	transform: scale(-1,-1);
  height:50%;
  text-align: left;
}
.card {
	padding:10px;
	width:100px;
  height:150px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  background-color: white;
  box-shadow: 5px 5px 5px grey;
}
.card-value {
  font-size: 24px;
  margin-right: 5px;
}
</style>
