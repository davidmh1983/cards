<template>
  <div class="picked-card">
    <label> CARD {{ index }} </label>
    <input type="text" maxlength="2" v-model="value" :class="valid" @blur="updateCards" placeholder="Enter card"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PickedCard',
  components: {
    
  },
 data() {
    return {
      value: ''
    }
  },
  props: {
    index: Number,
  },
  methods: {
    updateCards() {
      if( (this.valid === 'correct' && this.value.length === 2) || (this.valid === 'normal' && this.value.length === 0) ){  
        this.setChosenCard()
      }
    },
    setChosenCard() {
      let card = [this.value, this.index-1]
      this.$store.dispatch('store/setChosenCard', card)
    },
    isValueRepeated() {
      for(let i=0; i<this.cards.length; i++) {
        if(i === this.index-1) {
          continue
        }
        if(this.cards[i] === this.value){
          return true
        }  
      }
      return false
    }
  },
  computed: {
    ...mapState({
      cards: state => state.store.cards,
      allCards: state => state.store.allCards
    }),
    valid() {
      return this.value.length <= 1 ? 
        'normal' 
        : 
        this.allCards.includes(this.value) && 
        !this.isValueRepeated() ? 
        'correct' 
        : 
        'wrong'
    }
  }
}
</script>

<style scoped lang="scss">
.picked-card {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  justify-content: flex-start;
}
label {
  font-size: 12px;
  margin-bottom: 5px;
  color: #999;
  font-weight: bold;
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
