import { Module } from '@nestjs/common';
import { Book, BookSchema } from './book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { v4 as uuid } from 'uuid';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([{
            name: Book.name,
            useFactory: () => {
                const schema = BookSchema;
                schema.pre('save', function () {
                    const book = this;
                    book.set('uuid', uuid());
                })
                return schema;
            }
        }])
    ],
    controllers: [BooksController],
    providers: [BooksService]
})
export class BooksModule { }
