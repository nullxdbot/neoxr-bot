### ⌗ DATABASE SETUP

Script ini mendukung multi-database, bisa menggunakan Mongo, MySQL, PostgreSQL, Redis dan Local (JSON). Defaultnya menggunakan Local jika environment `DATABASE_URL` di biarkan kosong.

Database disini tidak hanya berfungsi untuk menyimpan data user, grup, chat dan setting saja melainkan berserta auth-state atau sesi WhatsApp. Berikut adalah tutorial untuk setup cloud database :

#### 1. Mongo

Modul `mongodb@4.9.0` sudah terinstall built-in di modul [@neoxr/wb](https://www.npmjs.com/package/@neoxr/wb) jadi tidak perlu lagi ditambahkan di file **package.json**

Untuk mendapatkan URI/URL mongo cukup dengan mendaftar secara gratis di [https://www.mongodb.com](https://www.mongodb.com/).

#### 2. PostgreSQL

Modul `pg@8.13.1` tidak terinstall secara default seperti mongo jadi tambahkan modul tersebut di file **package.json** kemudian install.

```JSON
{
    "dependencies": {
        "pg": "8.13.1"
    }
}
```

Untuk mendapatkan URI/URL PostgreSQL cukup dengan mendaftar secara gratis di :

- [x] [Neon](https://neon.com/pricing)
- [x] [Aiven](https://aiven.io)
- [x] [Cockroach](https://cockroachlabs.cloud/)
- [x] [Supabase](https://supabase.com/pricing)

#### 3. MySQL

Sama halnya dengan postgre, modul `mysql2@3.12.0` tidak terinstall secara default, jadi tambahkan di file **package.json** dan install.


```JSON
{
    "dependencies": {
        "mysql2": "3.12.0"
    }
}
```

Untuk mendapatkan URI/URL MySQL cukup dengan mendaftar secara gratis di [https://aiven.io](https://aiven.io) atau [https://filess.io](https://filess.io/)

#### 4. Redis

Sama halnya dengan postgre, modul `redis@^5.8.3` tidak terinstall secara default, jadi tambahkan di file **package.json** dan install.


```JSON
{
    "dependencies": {
        "redis": "^5.8.3"
    }
}
```

Untuk mendapatkan URI/URL Redis cukup dengan mendaftar secara gratis di [https://aiven.io](https://aiven.io) atau [https://filess.io](https://filess.io/)

> [!CAUTION]
> Perlu diperhatikan versi dan setiap modul harus sama seperti pada dokumentasi untuk kompatibiltas.