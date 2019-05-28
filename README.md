
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>  
</p>  
  
[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master  
[travis-url]: https://travis-ci.org/nestjs/nest  
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux  
[linux-url]: https://travis-ci.org/nestjs/nest  
   <p align="center"> Ticketing Auth MicroService</p>  
  
  
  
## Description  
  
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.  


## Installation  
  
```bash  
$ npm install  
$ yarn instal  
```  
  
## Setting config params  
This project settings can be fount in the sub dir **/src/auth/config**  also the config vars have a default hardcorde value,  those variable must be  setted as environmental variables,  those vars are:

 - App Microservice

| Var | Description | Default Value|
|--|--|--|
| authAppPort | port for the rest api | 3000|
| authMicroPort | port to be used by the microservice <br>  | 3002 |


 - Database Config
 
 | Var | Description | Default Value|
|--|--|--|
| dbHost | Host the mongodb server | localhost|
| dbName | Db name  | ticketing-auth |
| dbPort | mongodb port | 27017|
| dbUserName | username for the mongodb auth | ~~emptyString~~ |
| dbPass | password for the mongodb auth | ~~emptyString~~|

 - Jwt Config
 
| Var | Description | Default Value|
|--|--|--|
| JwtExpiresIn | jwt expiration time in seconds | 120|
| secretKey | Secret key used to sign the jwt  | **~~randomgenertedHash~~** |

 - SecurityConf

| Var | Description | Default Value|
|--|--|--|
| saltRounds | Salt round used by the bcrypt algorith to hash the credentials password| 5|
| confirmExpiration | Expiration time for the confirm token | 10|
| forgotExpiration | Epiration time for the resetpassword token | 10|
| points | number of open requests  during the **duration** value | 50|
| duration | amount of time in seconds to allow the max conections points| 10|

 - Email Service Conf
 
 | Var | Description | Default Value|
|--|--|--|
| apiKey | sendGridApi key| **~~apiKey~~** |
| emailSender | Email default sender | ticketingauth@auth.com|



## Running the app  
  
```bash  
  
# development  
$ npm run start  
  
# watch mode  
$ npm run start:dev  
  
# production mode  
$ npm run start:prod  
```

## Log Files
There are two log files within the main folder one for errors **error.log** and another for warnings **warn.log**

## Api docs
This Api docs were made using swagger, you can access it once you start the server trough this:  [URL](http://localhost:3000/api-docs/)  

## Credential Flow

 1. Sign in, get a confirmation mail
 2. Confirm credentials, login
 
 another microservices will hit this microservice `check-token` for authorization, as this very moment that endpoint is just just for development purposes, it will be removed upon the integration of the other microservices, also the mail service will follow the same path.
