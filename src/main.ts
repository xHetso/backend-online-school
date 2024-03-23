import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')

	// Настройка CORS
	app.enableCors({
		origin: 'http://localhost:5173',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: 'Content-Type, Accept',
	})

	await app.listen(4200)
}
bootstrap()
