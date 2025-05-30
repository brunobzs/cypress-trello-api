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
- Validação de Status Code: Garantir respostas esperadas (200, 400, 404, ...)


## Casos de Teste
### 1. Criação de um novo board
- Enviar uma requisição POST para `/boards/`
- Validar resposta (status 200)
- Validar se o nome do board retornado corresponde ao enviado

### 2. Criação de um card em um board
- Envia uma requisção GET para `/members/me/boards` para obter o ID do board criado anteriormente
- Cria uma lista no board enviando uma requisição POST para `/lists` e guarda o ID da lista
- Enviar uma requisição POST para `/cards`
- Validar que o card foi criado com sucesso (status 200)
- Validar criação do card no board correto
- Validar estrutura do JSON retornado

### 3. Exclusão de um card
- Envia uma requisção GET para `/members/me/boards` para obter o ID do board criado anteriormente
- Envia uma requisição GET para `/lists` para obter o ID da lista criada antiormente
- Envia uma requisição GET para `/cards` para obter o ID do card criado anteriormente
- Enviar uma requisição DELETE para `/cards/{cardId}`
- Validar que o card foi excluído com sucesso (status 200)

### 4. Exclusão de um board
- Envia uma requisção GET para `/members/me/boards` para obter o ID do board criado anteriormente
- Enviar uma requisição DELETE para `/boards/{ID}`
- Validar resposta (status 200)


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