# 📚 API de Livros

API RESTful completa para gerenciamento de livros, desenvolvida com Node.js, Express e SQLite. O projeto implementa boas práticas de arquitetura, autenticação via JWT, filtros avançados e testes automatizados.

---

## 🚀 Funcionalidades

* ✅ CRUD completo de livros
* ✅ Banco de dados SQLite
* ✅ Relacionamento entre tabelas (livros ↔ autores)
* ✅ Filtros por gênero e autor
* ✅ Paginação e ordenação
* ✅ Validação de dados
* ✅ Autenticação com JWT
* ✅ Tratamento global de erros
* ✅ Testes automatizados com Jest

---

## 🛠️ Tecnologias utilizadas

* Node.js
* Express
* SQLite3
* JSON Web Token (JWT)
* Jest + Supertest

---

## 📁 Estrutura do projeto

```
src/
├── config/         # Conexão com banco
├── controllers/    # Regras de negócio
├── middlewares/    # Auth e erros
├── routes/         # Rotas da API
├── utils/          # Validações
└── app.js          # Inicialização

tests/              # Testes automatizados
```

---

## ⚙️ Instalação e execução

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/api-livros.git

# Entrar na pasta
cd api-livros

# Instalar dependências
npm install

# Rodar a aplicação
npm start
```

Servidor rodando em:

```
http://localhost:3000
```

---

## 🔐 Autenticação

A API utiliza JWT para proteger rotas sensíveis.

### Gerar token:

```http
POST /login
```

### Exemplo de resposta:

```json
{
  "token": "seu_token_aqui"
}
```

### Usar nas requisições:

```
Authorization: seu_token_aqui
```

---

## 📚 Endpoints

### 🔍 Listar livros

```http
GET /api/livros
```

#### Filtros disponíveis:

* `genero=Ficção`
* `autor=Autor`
* `page=1`
* `limit=5`

---

### 🔎 Buscar livro por ID

```http
GET /api/livros/:id
```

---

### ➕ Criar livro (JWT)

```http
POST /api/livros
```

```json
{
  "titulo": "Novo Livro",
  "genero": "Ficção",
  "ano": 2024,
  "autor_id": 1
}
```

---

### ✏️ Atualizar livro (JWT)

```http
PUT /api/livros/:id
```

---

### ❌ Deletar livro (JWT)

```http
DELETE /api/livros/:id
```

---

## 📊 Status Codes

| Código | Descrição           |
| ------ | ------------------- |
| 200    | Sucesso             |
| 201    | Criado              |
| 400    | Requisição inválida |
| 401    | Não autorizado      |
| 404    | Não encontrado      |
| 500    | Erro interno        |

---

## 🧪 Testes

Rodar testes automatizados:

```bash
npm test
```

---






