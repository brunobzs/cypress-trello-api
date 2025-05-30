describe('Testes de API do Trello', () => {
  it('Deve criar um novo board', () => {
    const boardName = 'Meu Board de Teste';

    cy.request({
      method: 'POST',
      url: `https://api.trello.com/1/boards/?name=${boardName}&key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(boardName);
    });
  });

  it('Deve criar um novo card em um board', () => {
    let boardId, listId;
    const listName = 'Minha Lista de Teste';

    cy.getMyBoards().then(responseBoards => {
      boardId = responseBoards[0].id; // Pega o ID do Board criado no teste anterior
    }).then(() => {
      // Cria uma nova lista no board
      cy.request({
        method: 'POST',
        url: `/lists?name=${listName}&idBoard=${boardId}&key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`
      }).then(responseList => {
        listId = responseList.body.id; // Pega o ID da lista criada

        // Cria um novo card na lista
        cy.request({
          method: 'POST',
          url: `https://api.trello.com/1/cards?idList=${listId}&key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`
        }).then(responseCard => {
          console.log(responseCard)
          expect(responseCard.status).to.eq(200);
          expect(responseCard.body.idList).to.eq(listId);
          expect(responseCard.body.idBoard).to.eq(boardId);
        })
      })
    });
  });

  it('Deve excluir um card existente', () => {
    let boardId, listId, cardId;

    cy.getMyBoards().then(responseBoards => {
      boardId = responseBoards[0].id; // Pega o ID do Board criado no teste anterior

      // Pega as listas do board
      cy.request({
        method: 'GET',
        url: `/boards/${boardId}/lists?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`
      }).then(responseLists => {
        listId = responseLists.body[0].id; // Pega o ID da primeira lista do board

        // Pega os cards da lista
        cy.request({
          method: 'GET',
          url: `/lists/${listId}/cards?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`
        }).then(responseCards => {
          cardId = responseCards.body[0].id; // Pega o ID do primeiro card da lista

          // Exclui o card
          cy.request({
            method: 'DELETE',
            url: `/cards/${cardId}?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`
          }).then(responseCards => {
            expect(responseCards.status).to.eq(200);
          })
        })
      })
    })
  });

  it('Deve excluir um board existente', () => {
    let boardId;

    cy.getMyBoards().then(response => {
      boardId = response[0].id;

      // Exclui o board
      cy.request({
        method: 'DELETE',
        url: `/boards/${boardId}?key=${Cypress.env('API_KEY')}&token=${Cypress.env('TOKEN')}`
      }).then(response => {
        expect(response.status).to.eq(200);
      });
    })
  });
})
