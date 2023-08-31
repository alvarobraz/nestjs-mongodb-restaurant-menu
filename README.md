<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  Aplicação em NestJS/TypeScript - Produtos, categorias e menu de um restaurante 🚀
  <br>
  <br>

  <img alt="Language count" src="https://img.shields.io/github/repo-size/alvarobraz/nestjs-mongodb-restaurant-menu"/>

  <a href="https://nestjs.com/">
    <img alt="Made by NestJS" src="https://img.shields.io/badge/made%20by-nestjs-%237519C1">
  </a>

  <a href="https://www.linkedin.com/in/alvarobraz/">
    <img alt="Made by alvarobraz" src="https://img.shields.io/badge/made%20by-alvarobraz-%237519C1">
  </a>

  <a href="https://github.com/alvarobraz/nestjs-mongodb-restaurant-menu/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alvarobraz/nestjs-mongodb-restaurant-menu">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/alvarobraz/nestjs-mongodb-restaurant-menu">
</p>

---

<p align="center">
  <a href="#dart-sobre">Sobre</a> &#xa0; | &#xa0; 
  <a href="#rocket-tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#estrutura">Estrurura</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requerimentos">Requerimentos</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-começando">Começando</a>
</p>

<br>

## :dart: Sobre ##

Projeto realizado em NestJs, ORM Prisma e MongoDB!

## :rocket: Tecnologias ##

As seguintes tecnologias foram utilizadas no projeto:

- [nest.js](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [class-validator](https://www.npmjs.com/package/class-validator)
- [multer](https://www.npmjs.com/package/multer)

## Estrutura ##
```
.
├── nest-cli.json
├── package.json
├── package-lock.json
├── prisma
│   └── schema.prisma
├── public
│   └── img
│       └── macarrao.jpeg
├── README.md
├── src
│   ├── app.module.ts
│   ├── category
│   │   ├── category.controller.ts
│   │   ├── category.module.ts
│   │   ├── category.service.ts
│   │   └── uploads
│   ├── dto
│   │   ├── category
│   │   │   └── index.ts
│   │   ├── menu
│   │   │   └── index.ts
│   │   ├── products
│   │   │   └── index.ts
│   │   └── user
│   │       └── index.ts
│   ├── main.ts
│   ├── menu
│   │   ├── menu.controller.ts
│   │   ├── menu.module.ts
│   │   └── menu.service.ts
│   ├── prisma.service.ts
│   ├── product
│   │   ├── product.controller.ts
│   │   ├── product.module.ts
│   │   └── product.service.ts
│   └── user
│       ├── user.controller.ts
│       ├── user.module.ts
│       └── user.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock


```

## :white_check_mark: Requerimentos ##

- [nest.js](https://nestjs.com/)
- [npm](https://www.npmjs.com/)

## :checkered_flag: Começando ##

```bash
# Clone this project
$ git clone https://github.com/alvarobraz/nestjs-mongodb-restaurant-menu

# Access
$ cd nestjs-mongodb-restaurant-menu

# Node version
$ nvm use 18.16.1

# Install dependencies
$ npm install

# Run the project
$ npm run start:dev

# The server will initialize in the <http://localhost:3333>
```

Nest is [MIT licensed](LICENSE).
