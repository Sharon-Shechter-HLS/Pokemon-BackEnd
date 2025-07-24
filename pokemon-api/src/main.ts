import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {DEFAULT_PORT} from './appConsts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') ?? DEFAULT_PORT; 

  console.log(`Application is running on:${port}`);
  await app.listen(port);
}
bootstrap();
