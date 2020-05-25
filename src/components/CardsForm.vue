<template>
  <div class="cards-form">
    <div class="cards-form__cards">  
      <PickedCard v-for="index in 10" :key="index" :index="index"/>
    </div>
    <div class="cards-form__rotation-card">
      <RotationCard />
    </div>
    <div>
      <div class="cards-form__submit" @click="submit" >Submit</div>
    </div>
  </div>
</template>

<script>
import PickedCard from './PickedCard.vue'
import RotationCard from './RotationCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'CardsForm',
  components: {
    PickedCard,
    RotationCard
  },
  props: {
    text: String
  },
  computed: {
    ...mapState({
      cards: state => state.store.cards,
      deckId: state => state.store.deckId
    })
  },
  methods: {
    submit() {
      let valids = [];
      for(let i = 0; i<this.cards.length; i++ ){
        if(this.cards[i]!== '' && this.cards[i]!== undefined){
          valids.push(this.cards[i])
        }
      }
      this.$store.dispatch('store/submit', valids).then(
      this.$router.push(`/deck/${this.deckId}`))
    }
    
  }
}
</script>

<style scoped lang="scss">
.cards-form {
  background-color: #BFE7F4;
  width: 100%;
  min-height: calc( 100vh - 95px );
  padding: 20px;
  &__cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  &__rotation-card{
    margin: 0 auto;
  }
  &__submit {
    background-color: #0E0E61;
    padding: 10px 20px;
    border-radius: 15px; 
    width: 150px;
    color: yellow;
    font-size: 24px; 
    font-family: sans-serif;
    font-weight: 600;  
    margin: 200px auto 0 auto;
  }
}

</style>
