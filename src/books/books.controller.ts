import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import * as _ from 'lodash';

@Controller()
export class BooksController {

    constructor(
        private booksService: BooksService
    ) { }

    @Post('book/add')
    async create(@Body() createBookDto: CreateBookDto, @Res() res) {
        try {
            const output = await this.booksService.create(createBookDto);
            return res.status(HttpStatus.OK).json({
                message: 'success',
                data: output
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                messsage: 'Something went wrong!'
            });
        }
    }

    @Put('book/:uuid/update')
    async update(@Param('uuid') uuid: string, @Body() updateBookDto: UpdateBookDto, @Res() res) {
        const output = await this.booksService.update(uuid, updateBookDto);
        if (_.isEmpty(output)) {
            return res.status(HttpStatus.OK).json({
                message: 'we couldn\'t find any book to update!'
            });
        }
        return res.status(HttpStatus.OK).json({
            message: 'Updated record!',
            data: output
        });
    }

    @Delete('book/:uuid')
    async delete(@Param('uuid') uuid: string, @Res() res) {
        const output = await this.booksService.delete(uuid);
        if (_.get(output, 'deletedCount') == 0) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'The provided uuid does not found.'
            })
        }
        return res.status(HttpStatus.OK).json({
            message: 'Record removed'
        });
    }

    @Get('books')
    async findAll(@Res() res) {
        const output = await this.booksService.findAll();
        if (_.isEmpty(output)) {
            return res.status(HttpStatus.OK).json({
                message: 'we couldn\'t find any books!'
            });
        }
        return res.status(HttpStatus.OK).json({
            message: 'success',
            data: output
        });
    }

    @Get('book/:uuid')
    async findOne(@Param('uuid') uuid: string, @Res() res) {
        const output = await this.booksService.findOne(uuid);
        if (_.isEmpty(output)) {
            return res.status(HttpStatus.OK).json({
                message: 'we couldn\'t find any book!'
            });
        }
        return res.status(HttpStatus.OK).json({
            message: 'success',
            data: output
        });
    }
}
