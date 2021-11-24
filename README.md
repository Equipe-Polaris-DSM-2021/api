# API

Neste guia iremos configurar o ambiente de desenvolvimento, clonando o projeto e instalando suas dependências, além de como executar. Ainda neste guia é possível encontrar uma breve explicação da estrutura das pastas adotada para a construção em equipe desse projeto.

### Links úteis (para antes de clonar o repositório)
- [Instalação das ferramentas](https://www.notion.so/Instala-o-das-ferramentas-405f3e8b014649cbb422dee6b5bd0535): como instalar o Node, NPM ou Yarn e o Visual Studio Code (tutoriais para Windows, MacOS e Linux)
- [Atualização (caso já tenha as ferramentas](https://www.notion.so/Atualiza-o-vers-es-diferentes-09abff4d88d44c459a7c7a925ad15bfa): se já passou pelo processo de instalação do Node, NPM e Yarn alguma vez, realize este tutorial para garantir as versões mais recentes das ferramentas (para Windows, MacOS e Linux)
- [Caso surja algum problema...](https://www.notion.so/Tive-problemas-e-agora-c67378e1319d4723a3211aad8eb987c6)

## Clonando projeto
No arquivo `.env.example`, complete as variâveis com os valores abaixo e renomeie o arquivo para `.env`.
```cl
EARTH_SEARCH=https://earth-search.aws.element84.com/v0
STAC_API=https://api.stacspec.org/

DEV_SEED=https://sat-api.developmentseed.org/
```
Com todas as ferramentas necessárias devidamente instaladas (Node, Git...), baixe ou clone este repositório pelo terminal seguindo passo a passo descrito abaixo:

```bash
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/Equipe-Polaris-DSM-2021/api.git

# Acesse a pasta do projeto
$ cd api-main

# Instale as dependências do projeto (são listadas no arquivo package.json)
$ yarn

# Execute o projeto
$ yarn dev
```

Agora o servidor deste projeto está ativo. É só acessar pelo localhost na porta 3333: [https://localhost:3333]!

## Explicação da estrutura das pastas

| Pasta                                        | Definição                                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| :open_file_folder: ** tests **               | Configuração e execução de testes com Jest (para executar: `yarn jest`)                              |
| :open_file_folder: node_modules/             | Armazena as bibliotecas (dependências) usadas pelo projeto                                           |
| :open_file_folder: src/ app/ controllers     | Arquivos com os métodos de requisição das rotas                                                      |
| :open_file_folder: src/ app/ models          | Arquivos considerados moldes/classes da aplicação                                                    |
| :open_file_folder: src/ database/ migrations | Arquivos gerados pelo TypeORM                                                                        |
| :page_facing_up: ormconfig.json              | Arquivo de configuração do TypeORM (indica login e porta do banco de dados, esquema de pastas e etc) |
| :page_facing_up: package.json                | Arquivo usado para gerenciar as dependências do projeto, scripts e versões                           |

### Tecnologias utilizadas
As seguintes tecnologias e ferramentas estão sendo utilizadas neste projeto:

- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJS](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/docs/getting-started)
