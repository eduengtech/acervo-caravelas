# Acervo Caravelas

O **Acervo Caravelas** é uma plataforma digital para o cadastro, organização e preservação do acervo cultural da cidade de Caravelas. O sistema permite a curadoria de itens culturais e a exibição pública desses conteúdos por meio de uma API e uma interface web.

## 🛠 Tecnologias Utilizadas

- **Backend:** [NestJS](https://nestjs.com/)
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT
- **Validação:** class-validator + DTOs
- **Documentação:** Swagger
- **Hospedagem:** Railway
- **Linguagem:** TypeScript

## 📁 Estrutura do Projeto

- `auth/` - Módulo de autenticação (login, registro)
- `user/` - Gerenciamento de usuários
- `autor/` - Cadastro e listagem de autores do acervo
- `categoria/` - Categorias culturais dos itens
- `tipo-de-item/` - Tipos de itens do acervo (ex: fotografia, vídeo)
- `item-do-acervo/` - Conteúdos culturais
- `arquivo-digital/` - Upload e acesso a arquivos digitais
- `prisma/` - Esquema e acesso ao banco de dados

## 🔐 Autenticação e Segurança

O sistema utiliza autenticação via JWT. A maior parte das rotas administrativas é protegida por Guards e decorators personalizados que validam permissões do usuário.

## 🧪 Testes

Alguns testes unitários foram implementados utilizando `@nestjs/testing`. O suporte a testes será expandido futuramente.

## 🚀 Como Executar Localmente

```bash
# Clone o repositório
git clone https://github.com/eduengtech/acervo-caravelas.git
cd acervo-caravelas

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.test .env

# Execute as migrations do Prisma
npx prisma migrate dev

# Inicie o servidor
npm run start:dev
```

## 🌐 Documentação Swagger

Após iniciar o servidor, acesse a documentação interativa:
```
http://localhost:3333/api
```

## 📦 Deploy

O backend pode ser facilmente hospedado no Railway ou outra plataforma de sua escolha. As variáveis de ambiente incluem:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`


## Próximos passos
- Implementar testes automatizados

- Finalizar o frontend com Next.js

- Refatorar e aplicar CI/CD


## 📝 Licença

Projeto desenvolvido para fins acadêmicos e de portfólio. Sinta-se livre para estudar e adaptar.
