import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 100000, maxFiles: 10 }));
  await app.listen(process.env.SERVER_PORT || 3000);
  Logger.log(
    `Server Running on http://localhost:${process.env.SERVER_PORT}/graphql`,
    'Bootstrap',
  );
}
bootstrap();
