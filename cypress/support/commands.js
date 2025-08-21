Cypress.Commands.add('getMyBoard', () => {
  cy.request('GET', `/members/me/boards?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`)
    .then(response => {
      return response.body.filter(board => board.name === 'Meu Board de Teste');
    })
})