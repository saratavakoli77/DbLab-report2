import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import EmployerDto from '../dto/employer.dto';
import ProjectDto from '../dto/project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }
    @Get()
    getAllProjects() {
        return this.projectsService.getAllProjects();
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Project Id Not Valid' })
    @Get(':id')
    getAllProject(@Param('id') id: number) {
        return this.projectsService.getProject(id);
    }

    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 400, description: 'Project Id Not Valid' })
    @Get(':id/bids')
    getProjectBids(@Param('id') id: number) {
        return this.projectsService.getProjectBids(id);
    }

}
