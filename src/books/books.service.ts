import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto, UpdateBookDto } from './dto';
import { Books } from './interfaces/books.interface';

@Injectable()
export class BooksService {

    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>
    ) { }

    create(createBookDto: CreateBookDto): Promise<Books> {
        const createdBook = new this.bookModel(createBookDto);
        return createdBook.save();
    }

    update(uuid: string, updateBookDto: UpdateBookDto): Promise<Books> {
        return this.bookModel.findOneAndUpdate({ uuid: uuid }, updateBookDto, { new: true }).exec();
    }

    delete(uuid: string) {
        const deletedBook = this.bookModel.deleteOne({ uuid: uuid });
        return deletedBook;
    }

    findOne(uuid: string): Promise<Books> {
        return this.bookModel.findOne({ uuid: uuid }).exec();;
    }

    findAll(): Promise<Books[]> {
        return this.bookModel.find().exec();
    }
}
