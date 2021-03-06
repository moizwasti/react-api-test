# Tintash Films API

## Setup

### Installation

#### Clone Repository

```
git clone https://github.com/moizwasti/react-api-test
```

#### Install Node Modules

```
npm install
```

### Create .env
Create a .env file with the following definitions:

* `PORT` = (your port)
* `HOST` = (your host)

* `DB_DIALECT` = postgres
* `DB_HOST` = (your db host)
* `DB_PORT` = (your db port)
* `DB_NAME` = (your db name)
* `DB_USER` = (your db username)
* `DB_PASSWORD` = (your user password)

* `JWT_ENCRYPTION` = (an encryption string)

### Perform DB Migrations

```
npm run migrate
```

## Run

```
npm run start:dev
```