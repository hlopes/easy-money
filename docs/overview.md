# 📡 Overview

The application is simple. Users add bank accounts and transactions (incomes or expenses). With that information the users can have an overview of all incomes and expenses in the dashboard.

[Vercel Demo](https://easy-money-git-main-hlopes.vercel.app/)

[Netlify Demo](https://relaxed-gnome-88a9f6.netlify.app/)

## Data model

The application contains the following models:

- Bank Account - the users can perform crud operations and they should map with the financial sources of the user;

- Transaction: represents the user incomes and expenses (type field) and they belong to a specific bank account.

- Category: a variety type of transactions categorizations.

## Regenerate the DB types

```bash
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql,
 sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database. 
```

## Get Started

To set up the app execute the following commands.

```bash
git clone https://github.com/hlopes/easy-money.git
cd easy-money
cp .env.example .env
pnpm install
```

##### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.ts`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

##### `pnpm build`

Builds the app for production to the `build` folder.\
It correctly bundles NextJS in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](./deployment.md)
