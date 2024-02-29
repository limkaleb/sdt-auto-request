## Note

Please add `.env` file with `.env.example` as reference

## Installation

```bash
# pnpm
$ pnpm install
```

## Running the app

```bash
# watch mode
$ pnpm run start:dev
```

## Seed database

```bash
# seed db
$ npx prisma db seed
```

## Run unit test

```bash
# unit tests
$ pnpm run test:unit
```

## Working endpoints
```
CreateUser: localhost:3000/api/user [POST]
UpdateUser: localhost:3000/api/user/:id [PUT]
DeleteUser: localhost:3000/api/user/:id [DELETE]
GetUserById: localhost:3000/api/user/:id [GET]
GetUser: localhost:3000/api/user [GET]
```

## Create user
```json
{
	"firstName": "aaaa",
	"lastName": "bbbb",
	"birthDate": "2000-06-23",
	"location": "Paris"
}

```

`birthDate` format is `YYYY-MM-DD`


`location` format is CamelCase, and for now can only input one of these cities for now:
```
Taipei, HongKong, KualaLumpur, Singapore, NewYork, Jakarta, Tokyo, Seoul, Amsterdam, Bangkok, LosAngeles, Melbourne, Sydney, Brisbane, Paris
```

