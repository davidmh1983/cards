<template>
<div>
  <Title text="CARDS" />
  <CardsForm /> 
</div>
</template>

<script>


import Title from '../components/Title.vue'
import CardsForm from '../components/CardsForm.vue'
export default {
  name: 'New',
  components: {
    Title,
    CardsForm
  },
  
  computed: {
   
  },
  methods:{
  },
  created() {
    this.$store.dispatch("store/setAllCards")
    this.$store.dispatch("store/shuffleCards")
  }
}
</script>
<template>
<div>
  <Title text="CARDS" />
  <CardsForm /> 
</div>
</template>

<script>


import Title from '../components/Title.vue'
import CardsForm from '../components/CardsForm.vue'
export default {
  name: 'New',
  components: {
    Title,
    CardsForm
  },
  
  computed: {
   
  },
  methods:{
  },
  created() {
    this.$store.dispatch("store/setAllCards")
    this.$store.dispatch("store/shuffleCards")
  }
}
</script>
