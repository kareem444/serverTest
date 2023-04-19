import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
var cors = require('cors')
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors())
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('ITI graduation project')
    .setDescription('The is documentation for our Dreamy Weddings project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
