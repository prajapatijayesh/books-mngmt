import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto';
import * as _ from 'lodash';

@Controller()
export class BooksController {

    constructor(
        private booksService: BooksService
    ) { }

    /**
     * @description Add a book to the library 
     * @param createBookDto 
     * @param res 
     * @returns 
     */
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

    /**
     * @description Update book details
     * @param uuid 
     * @param updateBookDto 
     * @param res 
     * @returns 
     */
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

    /**
     * @description Delete a book from the library
     * @param uuid 
     * @param res 
     * @returns 
     */
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

    /**
     * @description Get all books
     * @param res 
     * @returns 
     */
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

    /**
     * @description Get book details
     * @param uuid 
     * @param res 
     * @returns 
     */
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
