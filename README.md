# Over The Air - OTA (Backend)
Projeto Over The Air plataforma de controle de versão de projetos IoT

## Funcionalidades da Plataforma - OTA :zap:
### API OTA: 
1. Requisições de usuário
   - Criação do usuário (nome, usuário, senha)
   - Criação e atualização de avatar do usuário
   - Criação de sessão de autenticação do usuário

2. Requisições de projeto
   - Criação do projeto (título, data, criado por)

### Testes API OTA:
1. Testes de usuário
   - Verificação de usuário com e-mail único (e-mail deve ser diferente dos outros já cadastrados)
   - Verificação de credencians de usuário (email e senha)
   - Verificação da autenticação de usuário ao realizar alteração de avatar

2. Testes de projetos
   - Verificação de criação de projeto com o mesmo título

## Tecnologias/Bibliotecas utilizadas :book:
- Linguagem e stack: Typescript e Nodejs
- Servidor da aplicação: express
- Banco de Dados: Postgresql com TypeOrm
- Testes: jest
- Autenticação de usuários: jsonwebtoken, bcryptjs, uuid
- Upload de arquivos: multer


## Arquitetura/Estratégias utilizadas :dart:
- SOLID (aplicação de 3 dos 5 princípios)
  - Princípio da responsabilidade única
  - Princípio da substituição de Liskov
  - Inversão de dependência
- Uso de Controllers para melhor gerenciamento das Rotas
- Repositórios Fake para testes automatizados

## Instruções para rodar o projeto :running:
### Configuração do BD Postgresql
É necessário criar um banco de dados postgresql seguindo os parâmetros informados no arquivo ormconfig.json

### Comandos da aplicação
1. Instalar dependências
```
yard add
```
ou
```
npm install
```

2. Rodar servidor da aplicação
```
yarn dev:server
```
