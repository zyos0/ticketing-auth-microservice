import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { rateLimiterMiddleware } from './auth/middlewares';
import { Transport } from '@nestjs/microservices';
import { AppConfig } from './auth/config';
import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: AppConfig.authMicroPort },
  });

  app.enableCors();
  app.use(rateLimiterMiddleware);
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe(
    {
      exceptionFactory: (errors: ValidationError[]) => new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          errors: errors.map(err => ({
            field: err.property,
            msg: Object.values(err.constraints),
          })),
        },
        HttpStatus.BAD_REQUEST,
      ),

    },
  ))
  ;
  const options = new DocumentBuilder()
    .setTitle('TicketingSystem Auth')
    .setDescription('Authorization Microservice')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.startAllMicroservices();
  await app.listen(AppConfig.authAppPort);
}

bootstrap();
