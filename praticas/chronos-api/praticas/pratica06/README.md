# Prática 06 – Tela de Login (React JS)

## Objetivo

Implementar uma tela de login para o **Chronos Pomodoro**, sem autenticação real, exercitando os conceitos de React trabalhados ao longo do projeto.

## O que foi implementado

### Estrutura de arquivos criada

```
src/
├── contexts/
│   └── AuthContext.tsx          # Context + Reducer de autenticação mock
├── pages/
│   ├── Login/
│   │   ├── index.tsx            # Página de login (rota /)
│   │   └── styles.module.css
│   └── Home/
│       ├── index.tsx            # Página home com logout (rota protegida)
│       └── styles.module.css
├── components/
│   ├── LoginForm/               # Formulário principal de login
│   ├── LoginInput/              # Input controlado com label
│   └── LoginActions/            # Botão de submit + links
└── App.tsx                      # AppRouter com renderização condicional
```

### Credenciais mock

| Campo   | Valor                  |
|---------|------------------------|
| Usuário | `usuario@chronos.com`  |
| Senha   | `chronos123`           |

## Conceitos de React aplicados

- **useState** – controle dos inputs, feedback, isSubmitting, viewMode
- **useEffect** – auto-focus no campo, limpar mensagens após 4 s, persistência de sessão
- **useReducer** – AuthContext com actions `LOGIN` e `LOGOUT`
- **useContext** – hook customizado `useAuth()`
- **forwardRef** – `LoginInput` aceita ref para auto-focus
- **Renderização condicional** – troca entre login/cadastro/recuperar senha e rota protegida
- **Componentes funcionais** – `LoginForm`, `LoginInput`, `LoginActions`, `LoginPage`, `HomePage`
- **CSS Modules** – estilização isolada por componente
- **sessionStorage** – persistência opcional de sessão ao dar F5

## Como rodar

```bash
cd praticas/pratica05/chronos-pomodoro
npm install
npm run dev
```

A primeira tela exibida é o **login**. Após autenticar com as credenciais mock, o Pomodoro completo é exibido. O botão "Sair" desloga e retorna à tela de login.
