# 🛢️ Data Model

The application contains the following models:

#### Models

- Bank Account - the users can perform crud operations and they should map with the financial sources of the user;

- Transaction: represents the user incomes and expenses (type field) and they belong to a specific bank account.

- Category: a variety type of transactions categorizations.

#### Regenerate the DB types

As ORM the application uses [Prisma](https://www.prisma.io/). Every time the Prisma schema is updated we need to regenerate the Database types and sync with the target db.

```bash
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql,
 sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
```
