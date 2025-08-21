describe('Testes de API do Trello', () => {
  it('Cadastrar um novo board', () => {
    const boardName = 'Meu Board de Teste';

    cy.request('POST', `/boards/?name=${boardName}&key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`)
      .then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(boardName);
    });
  });

  it('Cadastrar um novo card', () => {
    const listName = 'Minha Lista de Teste';

    cy.getMyBoards().then(responseBoards => {
      const boardId = responseBoards[0].id; // Pega o ID do Board criado no teste anterior

      // Cria uma nova lista no board
      cy.request('POST', `/lists?name=${listName}&idBoard=${boardId}&key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`)
        .then(responseList => {
          const listId = responseList.body.id; // Pega o ID da lista criada

          // Cria um novo card na lista
          cy.request('POST', `/cards?idList=${listId}&key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`)
            .then(responseCard => {
              expect(responseCard.status).to.eq(200);
              expect(responseCard.body.idList).to.eq(listId);
              expect(responseCard.body.idBoard).to.eq(boardId);
            })
        })
    })
  });

  it('Excluir um card', () => {
    cy.getMyBoards().then(responseBoards => {
      const boardId = responseBoards[0].id; // Pega o ID do Board criado no teste anterior

      // Pega as listas do board
      cy.request('GET', `/boards/${boardId}/lists?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`)
        .then(responseLists => {
          const listId = responseLists.body[0].id; // Pega o ID da primeira lista do board

          // Pega os cards da lista
          cy.request('GET', `/lists/${listId}/cards?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`)
            .then(responseCards => {
              const cardId = responseCards.body[0].id; // Pega o ID do primeiro card da lista

              // Exclui o card
              cy.request('DELETE', `/cards/${cardId}?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`)
                .then(responseCards => {
                  expect(responseCards.status).to.eq(200);
                })
            })
       })
    })
  });

  it('Excluir um board', () => {
    cy.getMyBoards().then(response => {
      const boardId = response[0].id;

      // Exclui o board
      cy.request('DELETE', `/boards/${boardId}?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`)
        .then(response => {
          expect(response.status).to.eq(200);
        });
    })
  });
})
