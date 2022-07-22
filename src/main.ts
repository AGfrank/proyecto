import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar títulos de documentación
  const options = new DocumentBuilder() 
    .addBearerAuth()
    .setTitle('MongoDB Order REST API')
    .setDescription('API REST para pedidos con MongoDB')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('product')
    .addTag('order')
    .build();
  const document = SwaggerModule.createDocument(app, options); 

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document); 

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
