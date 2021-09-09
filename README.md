# Backend

Neste guia iremos configurar o ambiente de desenvolvimento com a instalação do nodeJS, clonar o projeto do gitHub, instalação das dependências do projeto, e explicação da estrutura das pastas.

---

<br/>
<br/>

# Guias

[Instalação das ferramentas](https://www.notion.so/Instala-o-das-ferramentas-405f3e8b014649cbb422dee6b5bd0535)

[Atualização (versões diferentes)](https://www.notion.so/Atualiza-o-vers-es-diferentes-09abff4d88d44c459a7c7a925ad15bfa)

[Tive problemas, e agora?](https://www.notion.so/Tive-problemas-e-agora-c67378e1319d4723a3211aad8eb987c6)

<br/>

# Clonando projeto

Em qualquer lugar de sua preferência:

```bash
git clone https://github.com/Equipe-Polaris-DSM-2021/back.git
```

**Abra o projeto no vsCode**

```bash
cd back
code .
```

# Instalação das dependências do projeto

As dependências que serão instaladas estão listadas no package.json

```bash
yarn install
```

Emular o projeto

```bash
yarn start
```

<br/>
<br/>

# Explicação da estrutura das pastas

| Pasta                   | Definição                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| __ tests __             | Pasta para configuração e execução de testes com Jest. Execução de testes: "yarn jest"                                       |
| src/app/controllers     | Pasta de arquivos contendo os metodos de requisição das rotas (Organizar o nome com "assunto + Controller.ts").              |
| src/app/models          | Pasta de arquivos contendo os moldes/classes da aplicação.                                                                   |
| src/database/migrations | Pasta com arquivos gerados pelo TypeORM atraves do comando: "yarn typeorm migration:create -n Create + assunto + Table"      |
| ormconfig.json          | Arquivo de configuração do TypeORM indicando qual, login e porta do banco de dados, esquema de pastas, etc                   |
| package.json            | Contém metadados relevantes para o projeto e é usado para gerenciar as dependências do projeto, scripts, versão e muito mais |
| node_modules            | Armazena as bibliotecas (dependências) do projeto                                                                            |

<br/>

**Documentações**

[ExpressJS](https://expressjs.com/pt-br/)

[TypeORM](https://typeorm.io/#/)

[PostgreSQL](https://www.postgresql.org/docs/) 

[Jest](https://jestjs.io/docs/getting-started) 

<br/>
<br/>

_Bora codar 🚀_