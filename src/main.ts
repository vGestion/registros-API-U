import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configurar títulos de documentación
  const options = new DocumentBuilder()
    .setTitle('MongoDB Book REST API')
    .setDescription('API REST para libros con MongoDB')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  await app.listen(process.env.PORT_U);
}
bootstrap();
