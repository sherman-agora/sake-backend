<h1 align="center"><strong>youCodia2-auth</strong></h1>

<br />

## Features


## Requirements


## Getting started

* Install dependencies: `npm install`
* Setup Prisma: `npm run prisma:{ENV}` - `ENV`: specifies the environment you want to run in
    * for `dev` and `test`, docker is automatically setup by the scripts


## Documentation

### Commands

* `npm start` starts GraphQL server on `http://localhost:4000`
* `npm start:dev` starts GraphQL server for development (debugger mode), tracking changes
* `npm test:int` runs all integration tests in the project
* `npm test:unit` runs all unit tests in the project

### Project structure

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>|
| :--  | :--         |
| `├── .env` | Defines environment variables |
| `└── prisma ` (_directory_) | _Contains all files that are related to the Prisma database service_ |\
| `　　└── dev` (_directory_) | _Contains all files for development_ |
| `　　   ├── docker-compose.dev.yml` | The configuration file to run a docker image to house the database for your Prisma service |
| `　　   └── prisma.yml` | The root configuration file for your Prisma database service ([docs](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)) |
| `　　└── prod` (_directory_) | _Contains all files for production_ |
| `　　   ├── docker-compose.prod.yml`
| `　　   └── prisma.yml`
| `　　└── stag` (_directory_) | _Contains all files for staging_ |
| `　　   ├── docker-compose.stag.yml`
| `　　   └── prisma.yml`
| `　　└── test` (_directory_) | _Contains all files for testing_ |
| `　　   ├── docker-compose.test.yml`
| `　　   └── prisma.yml`
| `　　├── datamodel.prisma` | Defines your data model (written in [GraphQL SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)) |
| `　　└── seed.graphql` | Data to be seeded into the DB |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　├── server.js` | The entry point for your GraphQL server |
| `　　├── prisma.graphql` | The **application schema** defining the API exposed to client applications  |
| `　　├── schema.graphql` | The **application schema** defining the entire API  |
| `　　├── resolvers` (_directory_) | _Contains the implementation of the resolvers for the application schema_ |
| `　　├── utils` (_directory_) | _Contains the utility functions_ |
| `　　└── generated` (_directory_) | _Contains generated files_ |
| `　　　　└── prisma-client` (_directory_) | The generated Prisma client |
| `└── tests ` (_directory_) | _Contains the integration tests for the GraphQL server_ |

