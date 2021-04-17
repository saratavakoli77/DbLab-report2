import { Body, Controller, Get, Post, Delete, Param, Put } from '@nestjs/common';
import GenreServices from './genre.service';
import CreateGenreDto from '../user/dto/create-genre.dto';

@Controller('genre')
export default class GenreController {
    constructor(private readonly genreServices: GenreServices) { }
    @Post('post')
    postGenre(@Body() genre: CreateGenreDto) {
        return this.genreServices.insert(genre);
    }
    
    @Get()
    getAll() {
        return this.genreServices.getAllGenre();
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.genreServices.remove(id)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updates: CreateGenreDto) {
        return this.genreServices.update(id, updates)
    }
}