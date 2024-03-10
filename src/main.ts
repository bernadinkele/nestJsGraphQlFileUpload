import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 50 }));
  await app.listen(process.env.SERVER_PORT || 3000);
  Logger.log(
    `Server Running on http://localhost:${process.env.SERVER_PORT}/graphql`,
    'Bootstrap',
  );
}
bootstrap();
