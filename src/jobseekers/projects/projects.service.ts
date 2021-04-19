import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BidEntity from 'src/db/bid.entity';
import EmployerEntity from 'src/db/employer.entity';
import ProjectEntity from 'src/db/project.entity';
import EmployerDto from '../dto/employer.dto';
import ProjectDto from '../dto/project.dto';

@Injectable()
export class ProjectsService {
    async isProjectExist(id: number) {
        const foundedProject = await ProjectEntity.findOne(id);
        if (!foundedProject?.id) {
            throw new HttpException('Invalid Project Id Not Found', HttpStatus.BAD_REQUEST);
        }
        return foundedProject;
    }
    
    async getAllProjects(): Promise<ProjectEntity[]> {
        return ProjectEntity.find()
    }

    async getProject(id: number): Promise<ProjectEntity> {
        const foundedProject = await ProjectEntity.findOne(id);
        if (!foundedProject) {
            throw new HttpException('Project Id Not Valid', HttpStatus.BAD_REQUEST);
        }
        return foundedProject;
    }

    async getProjectBids(id: number): Promise<BidEntity[]> {
        await this.isProjectExist(id);
        const Project: ProjectEntity = await ProjectEntity.findOne({where: { id }});
        const { bids } = Project;
        return bids;
    }

}