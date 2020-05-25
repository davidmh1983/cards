<template>
  <div class="title">
    <label> {{ text }} </label>
  </div>
</template>

<script>
export default {
  name: 'Title',
  components: {
  },
  props: {
    text: String
  }
}
</script>

<style scoped>
.title {
  background-color: #2C8525;
  width: 100%;
  padding: 30px 0;
}
label {
  color: yellow;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 30px;
}
</style>
