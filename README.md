# Sistema de Usuários 📋

   Aplicação web simples para cadastro e visualização de usuários, desenvolvida com **Next.js**, **React** e **Tailwind CSS**, utilizando **Supabase** como backend (banco de dados e autenticação), com deploy feito via **Vercel**.

## 🔗 Acesse o Projeto Online

👉 [https://sistema-usuario-post.vercel.app](https://sistema-usuario-post.vercel.app)

## 🛠️ Tecnologias Utilizadas

*   [Next.js](https://nextjs.org/) — Framework React para produção
*   [React](https://reactjs.org/) — Biblioteca de interface declarativa
*   [Tailwind CSS](https://tailwindcss.com/) — Estilização com classes utilitárias
*   [Supabase](https://supabase.com/) — Backend como serviço (BaaS) com banco de dados PostgreSQL
*   [Vercel](https://vercel.com/) — Plataforma de hospedagem e deploy

## 📁 Funcionalidades

*   ✅ Cadastro de usuários com nome e e-mail
*   ✅ Listagem de todos os usuários cadastrados
*   ✅ Integração com Supabase para persistência dos dados
*   ✅ Estilização responsiva com Tailwind
*   ✅ Deploy contínuo com Vercel

## 🚀 Como rodar o projeto localmente

1.  **Clone este repositório:**

```css
git clone https://github.com/GustavoTrevezani/sistema-usuario-post
cd sistema-usuario-post
```

1.  **Instale as dependências:**

```css
npm install
```

1.  **Configure as variáveis de ambiente:**

```css
Crie um arquivo .env.local na raiz do projeto e adicione as chaves da API do Supabase:
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica
```

1.  **Rode o projeto:**

```css
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

## 🧠 Estrutura do Projeto

```css
/
├── pages/           # Rotas e páginas do Next.js
│   └── index.tsx    # Página principal com formulário e lista de usuários
├── lib/             # Lógica para integração com o Supabase
│   └── supabase.ts  # Cliente configurado do Supabase
├── styles/          # Arquivos de estilo globais
├── public/          # Arquivos estáticos
├── tailwind.config.js  # Configuração do Tailwind CSS
└── .env.local       # (Ignorado no Git) Configurações de ambiente 
```

## 🧾 API e Banco de Dados

Este projeto utiliza **Supabase** como backend, que oferece:

*   Banco de dados PostgreSQL
*   API REST automática
*   Chaves públicas seguras para uso no frontend

## 📦 Deploy

O projeto está hospedado na **Vercel**, com deploy automático a cada push na branch `main`.

🔗 Link do projeto: [https://sistema-usuario-post.vercel.app](https://sistema-usuario-post.vercel.app)

## ✍️ Autor

Desenvolvido por [**Gustavo Trevezani Frasson**](https://github.com/GustavoTrevezani) 🧠💻
