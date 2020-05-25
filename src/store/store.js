import axios from 'axios';


const state = {
  cards: [],
  allCards: [],
  rotationCard: '',
  deckId: '',
  numOfCards: 0,
  chosenCards: []
};

// getters
const getters = {
  getCards() {
    return state.cards;
  },
  getAllCards() {
    return state.allCards;
  },
  getRotationCard() {
    return state.rotationCard;
  },
  getDeckId() {
    return state.deckId;
  },
  getCardsCode() {
    return state.cards.map( (card) => {
      return card.code
    })
  },
};

// actions
const actions = {
  async shuffleCards({commit}) {
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
    commit('setDeckId', {
      data:res.data.deck_id
    });
  },
  async submit({commit}) {
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${state.deckId}/pile/chosen/add/?cards=${state.cards}`);
    commit('setNumOfCards', res.data.piles.chosen.remaining)
  },
  setAllCards({ commit }) {
    let cards=[];
    const values = ['2', 'A', 'K', 'Q', 'J', '9', '8', '7', '6', '5', '4', '3'];
    const suits = ['H', 'D', 'C', 'S'];
    for( let v = 0; v< values.length; v++) {
      for( let s = 0; s< suits.length; s++) {
        let currentCard = values[v] + suits[s];
        cards.push(currentCard);
      }
    }
    commit('setAllCards', { 
      cards: cards 
    });
  },
  setChosenCard: ({commit}, card) => {
    commit('markCard', card);
  },
  setRotationCard: ({commit}, card) => {
    commit('markRotationCard', card);
  }
};

// mutations
const mutations = {
  setDeckId(state, data){
    console.log(data)
    state.deckId = data.data;
  },
  setAllCards(state, cards) {
    state.allCards = cards.cards;
  },
  markCard(state, card){
    state.cards[card[1]] = card[0];
  },
  markRotationCard(state, card) {
    state.rotationCard = card;
  },
  setNumOfCards(state, num) {
    state.numOfCards = parseInt(num);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
