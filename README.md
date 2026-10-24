# Dont forger to add .env file with your database connection
**this template is using postgres but of course you can use what you want.**


##### env file
```
DATABASE_URL=
```

To install dependencies:
```sh
deno install
```

To run:
```sh
deno task dev
```

open http://localhost:3000

Database (drizzle-kit):
```sh
deno task db:generate   # generate migrations from src/db/schema.ts
deno task db:migrate    # apply migrations
deno task db:studio     # open Drizzle Studio
```
