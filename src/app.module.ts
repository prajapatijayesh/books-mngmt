import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          uri: config.get('MONGO_DATABASE_URI')
        }),
        inject: [ConfigService]
      }),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
