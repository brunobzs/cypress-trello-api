Cypress.Commands.add('getMyBoards', () => {
  return cy.request({
    method: 'GET',
    url: `/members/me/boards?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`
  }).then(response => {
    return response.body.filter(board => board.name === 'Meu Board de Teste');
  })
})