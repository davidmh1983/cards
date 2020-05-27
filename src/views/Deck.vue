<template>
  <div>
    <Title text="Ordered Pile" />
     <div class="ordered-cards">
      <Card v-for="item in orderedList" :key="item.code" :code="item.code" size="medium"/>
    </div>
    <div>
      <label class="rotation-text"> Rotation Card: </label>
      <label> {{ rotationCard }} </label> 
    </div>
    <Combos :list="combinations" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Title from '../components/Title.vue'
import Combos from '../components/Combos.vue'
import Card from '../components/Card.vue'
export default {
  name: 'Deck',
  components: {
    Title,
    Combos,
    Card
  },
  data() {
    return {
      suits: ['H','D','C','S'],
      values: ['2','A','K','Q','J','10','9','8','7','6','5','4','3'],
      orderToFollow: [],
      combinations: []
    }
  },
  computed: {
    ...mapState({
      rotationCard: state => state.store.rotationCard,
      chosenCards: state => state.store.chosenCards
    }),
    orderedList() {
      let order = [];
      for(var o= 0; o<this.orderToFollow.length; o++) {
        for(var l=0 ; l<this.chosenCards.length; l++){
          if(this.orderToFollow[o] == this.chosenCards[l].code) {
            order.push(this.chosenCards[l]);
            break;
          }
        }
      }
      return order;
    }
  },
  methods:{
    createOrderedList(list, value) {
      let index = 0;
      for(let i = 0; i <list.length; i++) {
        if( value === list[i] ){
          index = i;
          break;
        }
      }
      let first = list.slice(index)
      let second = list.slice(0,index)
      return first.concat(second)
    },
    isValid(combo) {
      var map = combo.map(function(m) {
        return m.split('')[0];
        },{} ).reduce(function(obj, b) {
        obj[b] = ++obj[b] || 1;
        return obj;
      }, {});
      return Object.keys(map).length === 2 && (
      ( Object.values(map)[0] === 2 && Object.values(map)[1] === 3) || 
      ( Object.values(map)[0] === 3 && Object.values(map)[1] === 2) )
    },
    combos() {
      for( var a=0; a<this.orderedList.length-4; a++ ) {
        for( var b=a+1; b<this.orderedList.length-3; b++ ) {
          for( var c=b+1; c<this.orderedList.length-2; c++ ) {
            for( var d=c+1; d<this.orderedList.length-1; d++ ) {
              for( var e=d+1; e<this.orderedList.length; e++ ) {
                let current = [ this.orderedList[a].code, this.orderedList[b].code, this.orderedList[c].code, this.orderedList[d].code, this.orderedList[e].code ]
                if( this.isValid(current) ) {
                  this.combinations.push(current)
                } 
              }
            }
          }
        }
      }
    },
    orderList() {
      let orderValue = this.createOrderedList(this.values, this.rotationCard.split('')[0])
      let orderSuit = this.createOrderedList(this.suits, this.rotationCard.split('')[1])
      let list = []
      for(let v=0; v<orderValue.length; v++) {
        for(let s=0; s<orderSuit.length; s++) {
          let card = orderValue[v] + orderSuit[s]
          list.push( card )
        }
      }
      this.orderToFollow = list;
    }
  },
  created() {
    this.$store.dispatch("store/getCardsOnPile").then(()=>{this.orderList()}).then(()=>{this.combos()})
  }
}
</script>

<style scoped>
.ordered-cards {
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 100px;
  flex-wrap: wrap;
  margin: 20px 40px;
  background-color: #ccc;
  border-radius: 10px;
  border: 1px solid black;
}
.rotation-text {
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
  display: inline-block;
}
</style>
