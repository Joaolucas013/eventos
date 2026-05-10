📅 Sistema de Cadastro de Eventos

Aplicação web desenvolvida em Angular para cadastro e listagem de eventos presenciais e online, utilizando json-server como API fake e nanoid para geração de IDs únicos.

🚀 Tecnologias utilizadas
Angular
TypeScript
RxJS
Angular Reactive Forms
json-server (API fake)
nanoid (geração de IDs únicos)
📌 Funcionalidades

O sistema permite:

Criar eventos
Listar eventos cadastrados
Filtrar eventos online
Validação dinâmica do formulário
Navegação entre páginas
Persistência dos dados via API fake
🧠 Regras de negócio

O formulário possui comportamento dinâmico:

Evento Online

Se eventoOnline = true

Campo link torna-se obrigatório
Campos de endereço não são obrigatórios
Evento Presencial

Se eventoOnline = false

Campos obrigatórios:
Endereço
Cidade
Campo link deixa de ser obrigatório


🔌 Configuração da API Fake

Instalar o json-server:

npm install -g json-server

Criar arquivo db.json na raiz do projeto:

{
  "eventos": []
}

Rodar a API:

json-server --watch db.json --port 3000


▶️ Como rodar o projeto

1️⃣ Instalar dependências:

npm install

2️⃣ Rodar API fake:

json-server --watch db.json --port 3000

3️⃣ Rodar Angular:

ng serve
