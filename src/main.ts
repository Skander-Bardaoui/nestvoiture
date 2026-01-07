import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Créer l'application comme NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir le dossier public à la racine
  app.useStaticAssets(join(__dirname, '..', 'public')); // Chemin vers C:\Users\skonb\Desktop\exam\examennest\public

  // Activer CORS
  app.enableCors();

  // Validation globale pour DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Lancer le serveur
  await app.listen(3005);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
