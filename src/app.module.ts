import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AuthorModule } from './author/author.module'
import { getMongoDBConfig } from './config/mongo.config'
import { FileModule } from './file/file.module'
import { IntensiveModule } from './intensive/intensive.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDBConfig,
		}),
		AuthModule,
		UserModule,
		IntensiveModule,
		FileModule,
		AuthorModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
