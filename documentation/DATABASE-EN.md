### ⌗ DATABASE SETUP

This script supports multiple databases — you can use Mongo, MySQL, PostgreSQL, Redis or Local (JSON). By default, it uses Local if the `DATABASE_URL` environment variable is left empty.

The database is not only used to store user, group, chat, and setting data, but also the WhatsApp auth-state or session. Below is a tutorial for setting up a cloud database:

#### 1. Mongo

The module `mongodb@4.9.0` is already built-in with [@neoxr/wb](https://www.npmjs.com/package/@neoxr/wb), so there’s no need to add it manually to your **package.json** file.

To get your MongoDB URI/URL, simply register for a free account at  [https://www.mongodb.com](https://www.mongodb.com/).

#### 2. PostgreSQL

The module `pg@8.13.1` is not installed by default like MongoDB, so you need to add it to your **package.json** file and then install it.

```JSON
{
    "dependencies": {
        "pg": "8.13.1"
    }
}
```

To get your PostgreSQL URI/URL, simply register for a free account at 

- [x] [Neon](https://neon.com/pricing)
- [x] [Aiven](https://aiven.io)
- [x] [Cockroach](https://cockroachlabs.cloud/)
- [x] [Supabase](https://supabase.com/pricing)

#### 3. MySQL

Similar to PostgreSQL, the module `mysql2@3.12.0` is not installed by default, so you need to add it to your **package.json** file and install it.

```JSON
{
    "dependencies": {
        "mysql2": "3.12.0"
    }
}
```

To get your MySQL URI/URL, simply register for a free account at [https://aiven.io](https://aiven.io) or [https://filess.io](https://filess.io/)

#### 4. Redis

Similar to PostgreSQL, the module `redis@^5.8.3` is not installed by default, so you need to add it to your **package.json** file and install it.

```JSON
{
    "dependencies": {
        "redis": "^5.8.3"
    }
}
```

To get your Redis URI/URL, simply register for a free account at [https://upstash.com/](https://upstash.com/)

> [!CAUTION]
> Please note that the version and each module must match the documentation to ensure compatibility.