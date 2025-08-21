# Testes Automatizados da API do Trello

Este projeto contém testes automatizados para a [API do Trello](https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-group-cards) utilizando Cypress, verificando operações básicas como criação e exclusão de boards, listas e cards.

## Pré-requisitos

- Node.js (versão 20 ou superior)
- Conta no [Trello](https://trello.com/)
- API Key e Token do Trello

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/brunobzs/cypress-trello-api
cd cypress-trello-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure suas credenciais do Trello:
- Crie um arquivo `cypress.env.json` na raiz do projeto com o seguinte conteúdo:
```plaintext
API_KEY=your_api_key
TOKEN=your_token
```
## Estratégia de Teste
### Mapeamento de Endpoints e Sequência de Execução

A chave para uma boa automação de testes de API é entender a sequência de ações. Não podemos excluir um card que não existe, ou um board que não foi criado. O fluxo de teste deve seguir a lógica de negócios da API.

* **Ação de Teste:** Cadastrar um Board
  * **Endpoint:**``` POST /1/boards```
  * **Necessário:** Nome do board (name).
  * **Resultado Esperado:** Resposta 200 OK, com um objeto board contendo um id único.


* **Ação de Teste:** Cadastrar um Card
  * **Endpoint:** ```POST /1/cards```
  * **Necessário:** Nome do card (name) e o id da lista (idList). Para obter o id da lista, é preciso primeiro criar um board (que vem com listas padrão) ou buscar a lista.
  * **Resultado Esperado:** Resposta 200 OK, com um objeto card contendo um id único.


* **Ação de Teste:** Excluir um Card
  * **Endpoint:** ```DELETE /1/cards/{id}```
  * **Necessário:** O id do card que foi criado no passo anterior.
  * **Resultado Esperado:** Resposta 200 OK.


* **Ação de Teste:** Excluir um Board
  * **Endpoint:** ```DELETE /1/boards/{id}```
  * **Necessário:** O id do board que foi criado no primeiro passo.
  * **Resultado Esperado:** Resposta 200 OK.

### Sequência Lógica de Testes (Fluxo Ideal):

1. **Criação do Board:** ```POST /1/boards```
    * Salvar o id do board e o id da lista padrão (idList) para uso futuro.


2. **Criação do Card:** ```POST /1/cards```
    * Usar o id da lista (idList) obtido no passo anterior.
    * Salvar o id do card para uso futuro.


3. **Exclusão do Card:** ```DELETE /1/cards/{id}```
    * Usar o id do card salvo.


4. **Exclusão do Board:** ```DELETE /1/boards/{id}```
    * Usar o id do board salvo.


5. **Sanity Check:** Após a exclusão, você pode adicionar um GET para verificar se os recursos realmente foram removidos. Por exemplo:
    * ```GET /1/cards/{id}``` (deve retornar 404 - Not Found).
    * ```GET /1/boards/{id}``` (deve retornar 404 - Not Found).

### Mapa Mental da Estratégia de Testes
```
Automação Trello API
│
├── Autenticação
│   └── API Key & Token
│
├── Testes CRUD
│   ├── Criar Board
│   │   └── Salvar idBoard
│   ├── Criar Lista
│   │   └── Salvar idList
│   ├── Criar Card
│   │   └── Salvar idCard
│   ├── Excluir Card
│   └── Excluir Board
│
└── Validações
├── Status Code
├── Estrutura JSON
└── Confirmação de Exclusão
```
## Casos de Teste

1. Cadastrar um novo board
2. Cadastrar um card
3. Excluir um card
4. Excluir um board


## Executando os Testes
Localmente:
```bash
npm run cypress:open  # Modo interativo
npm run cypress:run  # Modo headless
```

## Tecnologias
- Cypress
- JavaScript
- GitHub Actions