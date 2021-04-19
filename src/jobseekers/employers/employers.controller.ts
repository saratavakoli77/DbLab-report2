import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import EmployerDto from '../dto/employer.dto';
import ProjectDto from '../dto/project.dto';
import { EmployersService } from './employers.service';

@Controller('employers')
export class EmployersController {
    constructor(private readonly employersService: EmployersService) { }
    @Post()
    insertEmployer(@Body() employer: EmployerDto) {
        return this.employersService.insertEmployer(employer);
    }

    @Get()
    getEmployers() {
        return this.employersService.getEmployers();
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Employer Id Not Valid' })
    @Get(':id')
    getEmployer(@Param('id') id: number) {
        return this.employersService.getEmployer(id);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Employer Id Not Valid' })
    @Delete(':id')
    deleteEmployer(@Param('id') id: number) {
        return this.employersService.deleteEmployer(id);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post(':id/projects')
    insertProject(@Param('id') id: number, @Body() project: ProjectDto) {
        this.employersService.areIdsEqual(id, project.employerId);
        return this.employersService.insertProject(id, project);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Employer Id Not Valid' })
    @Get(':id/projects')
    getProjects(@Param('id') id: number) {
        return this.employersService.getProjects(id);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Id Not Found' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @Get(':id/projects/:pid/bids')
    getBids(@Param('id') id: number, @Param('pid') pid: number) {
        return this.employersService.getProjectBids(id, pid);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Id Not Found' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @Delete(':id/projects/:pid')
    deleteProject(@Param('id') id: number, @Param('pid') pid: number) {
        return this.employersService.deleteProject(id, pid);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Id Not Found' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @Put(':id/projects/:pid/bids/:bid')
    updateProject(
        @Param('id') id: number,
        @Param('pid') pid: number,
        @Param('bid') bid: number
    ) {
        return this.employersService.setFinalBid(id, pid, bid);
    }
}
