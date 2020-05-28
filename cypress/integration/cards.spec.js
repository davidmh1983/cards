describe('End to end test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/deck/new')
  })
  
  it('Loads Page', () => {
  })
  it('Page has 10 possible cards to choose', () => {
    cy.get('.picked-card').should('have.length', 10)
  })
  it('First Page has 1 rotation card', () => {
    cy.get('.rotation-card').should('have.length', 1)
  })
  it('Choose 4 cards and rotation card => Order depends on the rotation card', () => {
    cy.get('.picked-card').find('input').first().type('AS')
    cy.get('.picked-card').find('input').eq(2).type('5H')
    cy.get('.picked-card').find('input').eq(3).type('3D')
    cy.get('.rotation-card').find('input').type('3D')
    cy.get('.picked-card').find('input').eq(4).type('2H')
    cy.get('.cards-form__submit').click()
    cy.get('.card').should('have.length', 4)
    cy.get('.card').eq(0).get('.3D')
    cy.get('.card').eq(1).get('.2H')
    cy.get('.card').eq(2).get('.AS')
    cy.get('.card').eq(3).get('.5H')
  })
  it('Choose 2 cards and rotation card => No possible combinations', () => {
    cy.get('.picked-card').find('input').first().type('AS')
    cy.get('.rotation-card').find('input').type('3S')
    cy.get('.picked-card').find('input').eq(1).type('3S')
    cy.get('.cards-form__submit').click()
    cy.get('.card').should('have.length', 2)
    cy.get('.combos').find('label').eq(1).contains('No Combinations')
  })
  it('Choose 5 cards and rotation cards => One possible combination. "', () => {
    cy.get('.picked-card').find('input').first().type('AS')
    cy.get('.picked-card').find('input').eq(2).type('AH')
    cy.get('.picked-card').find('input').eq(3).type('AD')
    cy.get('.picked-card').find('input').eq(4).type('3H')
    cy.get('.rotation-card').find('input').type('3S')
    cy.get('.picked-card').find('input').eq(1).type('3S')
    cy.get('.cards-form__submit').click()
    cy.get('.card').should('have.length', 5)
    cy.get('.combos').find('div').contains('"3S", "3H", "AS", "AH", "AD"')
  })
})