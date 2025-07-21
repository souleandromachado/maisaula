
# 📱 +Aula - Aplicativo Mobile de apoio ás aulas

Aplicativo React Native com funcionalidades para professores criarem, editarem e deletarem publicações com quiz associado, e alunos visualizarem o conteúdo.

---

### ✅ Funcionalidades

- Login de professores e alunos
- Criação de publicações com resumo + quiz
- Edição e exclusão de publicações (com quiz vinculado)
- Visualização por alunos
- Diferenciação de telas conforme o tipo de usuário

---

### ⚙️ Pré-requisitos

- Node.js 18+
- Expo Go instalado no celular
- Backend em execução (fornecido separadamente)

---

### 🚀 Como rodar o projeto

1. Clone o repositório

2. Instale as dependências:

```bash
npm install
```

3. Configure a URL da API:

- Copie o arquivo de exemplo:

```bash
cp .env .env
```

- Edite o arquivo `.env` ou `src/config.js` (caso esteja usando essa abordagem) e **troque `localhost` pelo IP da máquina que está rodando o backend**:

```js
// Exemplo em src/config.js
export const API_URL = 'https://resumo-service-gz31.onrender.com';
```

> 💡 No terminal da máquina com o backend, digite `ipconfig` (Windows) ou `ifconfig` (Linux/macOS) para encontrar o **endereço IPv4 local**.

4. Inicie o app:

```bash
npx expo start
```

5. Escaneie o QR code com o app **Expo Go** no seu celular (mesma rede Wi-Fi da máquina).

---

### 📡 Backend

O backend deve estar rodando localmente (porta 3000) com as seguintes rotas:

- `POST /resumo` – Cria publicação com quiz
- `PUT /resumo/:id` – Edita publicação
- `DELETE /resumo/:id` – Deleta publicação e quiz
- `POST /auth` – Login
- `GET /historico/:idAluno` – Visualiza histórico (modo aluno)

Caso ainda não tenha o backend, solicite ao responsável pelo projeto ou acesse [REPO_BACKEND_AQUI].

---

### 🧪 Testes

- Professores: Logar com e-mail/senha válidos e testar criação/edição/deleção.
- Alunos: Apenas visualizar as publicações e histórico.
- Qualquer erro de conexão indica que a `API_URL` não foi configurada corretamente.

