# NLW Agents Web - Q&A Platform

Uma plataforma de perguntas e respostas com IA, onde usuários podem criar salas e fazer perguntas para receber respostas inteligentes.

## 🚀 Tecnologias Utilizadas

### Core
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server

### Estilização
- **TailwindCSS 4** - Framework CSS utilitário
- **Radix UI** - Componentes primitivos acessíveis
- **Lucide React** - Ícones SVG

### Gerenciamento de Estado e Dados
- **TanStack Query** - Cache e sincronização de dados do servidor
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas TypeScript

### Roteamento
- **React Router DOM** - Roteamento client-side

### Utilitários
- **class-variance-authority** - Utilitário para variantes de classes CSS
- **clsx** + **tailwind-merge** - Combinação de classes CSS
- **dayjs** - Manipulação de datas

## 🏗️ Padrões de Projeto

### Estrutura de Pastas
```
src/
├── components/         # Componentes reutilizáveis
│   └── ui/            # Componentes base do design system
├── pages/             # Páginas da aplicação
├── http/              # Hooks para requisições HTTP
│   └── types/         # Tipos TypeScript para API
└── lib/               # Utilitários e configurações
```

### Componentes
- **Composição sobre herança** - Uso de Radix UI primitives
- **Design System** - Componentes base na pasta `ui/`
- **Props interface** - Tipagem explícita para componentes

### Gerenciamento de Estado
- **Server State** - TanStack Query para dados do servidor
- **Form State** - React Hook Form com validação Zod
- **URL State** - React Router para estado de navegação

## ⚙️ Setup e Configuração

### Pré-requisitos
- Node.js 18+
- npm/yarn/pnpm

### Instalação

1. Clone o repositório
```bash
git clone <repository-url>
cd web
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
```

4. Acesse a aplicação
```
http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview do build de produção
```

### Configuração do Backend

O projeto espera uma API REST rodando em `http://localhost:3333` com os seguintes endpoints:

- `GET /rooms` - Lista salas
- `POST /rooms` - Cria nova sala
- `GET /rooms/:id/questions` - Lista perguntas da sala
- `POST /rooms/:id/questions` - Cria nova pergunta

Você pode encontrar a API REST desenvolvida para essa plataforma <a href="https://github.com/SGSchneider/NLW-Agents-Server">**neste repositório**</a>!


## 🎨 Design System

Os componentes seguem o padrão do **shadcn/ui** com customizações:

- **Theme**: Sistema de cores baseado em CSS custom properties
- **Dark Mode**: Suporte nativo ao modo escuro
- **Responsive**: Mobile-first design
- **Acessibilidade**: Componentes Radix UI como base
