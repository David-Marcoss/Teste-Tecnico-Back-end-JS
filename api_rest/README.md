# Solução 2: utilizando Typescript e Nestjs

Esta abordagem resolve o problema por meio de uma API REST, que recebe e processa os dados conforme as especificações do problema.

Nesta solução, os dados de pedidos e notas devem ser enviados por meio de requisições para a API.

A pasta Rotas-Teste-Postman possui um arquivo com as rotas da aplicação para serem testadas na ferramenta Postman 


Nesta solução utiliza-se as tecnologias:
  - Typescript
  - Nestjs
  - Prisma ORM
  - Banco de dados SQLITE
  - Docker

## - Execultando a aplicação com Docker 

    docker-compose build

    docker-compose up

## - Execultar aplicação sem o Docker


### - Baixar dependencias 

    npm i

### - Criar Banco de Dados

    npx prisma migrate dev --name init

### - Execultar aplicação

    npm run start:dev

### - Execultar Testes Unitários

    npm jest

## Rotas de Teste 

### Cadastro ou listagem de pedidos

  localhost:3000/api/v1/pedidos

### Cadastro ou listagem de notas

  localhost:3000/api/v1/notas