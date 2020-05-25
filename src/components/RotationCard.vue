<template>
  <div class="rotation-card">
    <label> Rotation CARD: </label>
    <input type="text" maxlength="2" v-model="value" :class="valid" @blur="updateCard"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RotationCard',
  components: {
    
  },
 data() {
    return {
      value: ''
    }
  },
  methods: {
    updateCard() {
      if( this.valid === 'correct' && this.value.length === 2){
        this.$store.dispatch('store/setRotationCard', this.value)
      }
    }
  },
  computed: {
    ...mapState({
      allCards: state => state.store.allCards
    }),
    valid() {
      return this.value.length <= 1 ? 
        'normal' 
        : 
        this.allCards.includes(this.value) ?
        'correct' 
        : 
        'wrong'
    }
  }
}
</script>

<style scoped>
.rotation-card {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  justify-content: flex-start;
}
input {
  padding: 8px;
  border-radius: 4px;
  width: 80%;
  border: 0;
}
.normal {
  color: black;
}
.correct {
  color: green;
}
.wrong {
  color:red;
}
</style>
