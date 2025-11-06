# ERP.AERO Test Task
Employment test task by Agaev Artem.

## Getting started
### Database
File `/db/init.sql` contains mysql database setup.
### Server
To run server go to `server` directory
```shell
cd ./server
```
Install npm packages with
```shell
npm install
```
Create `.env` file with server setup. `.env` example:
```.env
PORT=3333
DB_HOST=localhost
DB_PORT=3306
DB_USER=mysql
DB_PASSWORD=mysql
DB_DATABASE=erp_aero
PASSWORDS_HASH_SALT_ROUNDS=10
JWT_ACCESS_SECRET_KEY=my_jwt_access_secret
JWT_REFRESH_SECRET_KEY=my_jwt_refresh_secret
JWT_ACCESS_LIFETIME=10
JWT_REFRESH_LIFETIME=1440
```
Start server with
```shell
nodemon
```
or
```shell
node index.js
```
