import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import EmployerEntity from 'src/db/employer.entity';
import ProjectEntity from 'src/db/project.entity';
import EmployerDto from '../dto/employer.dto';
import ProjectDto from '../dto/project.dto';

@Injectable()
export class EmployersService {
    async isEmployerExist(id: number) {
        const foundedEmployer = await EmployerEntity.findOne(id);
        if (!foundedEmployer?.id) {
            throw new HttpException('Employer Id Not Found', HttpStatus.BAD_REQUEST);
        }
        return foundedEmployer;
    }

    async isProjectExist(id: number) {
        const foundedProject = await ProjectEntity.findOne(id);
        if (!foundedProject?.id) {
            throw new HttpException('Invalid Project Id Not Found', HttpStatus.BAD_REQUEST);
        }
        return foundedProject;
    }


    async validateProjectOwnerAccess(Project: ProjectEntity, employerId: number) {
        if (Project.employer?.id != employerId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    async areIdsEqual(firstId: number, secondId: number) {
        if (firstId != secondId) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }

    async insertEmployer(newEmployer: EmployerDto): Promise<EmployerEntity> {
        const { projectIds, ...employerInfo } = newEmployer;
        const employer = new EmployerEntity();
        Object.keys(employerInfo).forEach((key) => {
            employer[key] = employerInfo[key];
        });
        employer.projects = [];
        if (projectIds) {
            for (let i = 0; i < projectIds.length; i++) {
                const project = await ProjectEntity.findOne(projectIds[i]);
                employer.projects.push(project);
            }
        }
        await employer.save();
        return employer;
    }

    async getEmployer(id: number): Promise<EmployerEntity> {
        const foundedEmployer = await this.isEmployerExist(id);
        return foundedEmployer;
    }

    async getEmployers(): Promise<EmployerEntity[]> {
        return EmployerEntity.find();
    }

    async deleteEmployer(id: number): Promise<any> {
        await this.isEmployerExist(id);
        return await EmployerEntity.delete({ id });
    }

    async insertProject(employerId: number, newProject: ProjectDto): Promise<ProjectEntity> {
        await this.isEmployerExist(employerId);
        const { ...ProjectInfo } = newProject;
        const Project = new ProjectEntity();
        Object.keys(ProjectInfo).forEach((key) => {
            Project[key] = ProjectInfo[key];
        });
        Project.employer = await EmployerEntity.findOne(employerId);
        await Project.save();
        return Project;
    }

    async getProjects(employerId: number): Promise<ProjectEntity[]> {
        await this.isEmployerExist(employerId);
        const Employer: EmployerEntity = await EmployerEntity.findOne({
            where: { id: employerId },
            relations: ['projects'],
        });
        return Employer.projects;
    }

    async getProject(employerId: number, projectId: number): Promise<any> {
        await this.isEmployerExist(employerId);
        await this.isProjectExist(projectId);
        const Project: ProjectEntity = await ProjectEntity.findOne({
            where: { id: projectId },
            relations: ['employer'],
        });
        await this.validateProjectOwnerAccess(Project, employerId);
        const { employer, ...ProjectInfo } = Project;
        if (Project.employer?.id == employerId) {
            return ProjectInfo;
        }
    }

    async getProjectBids(employerId: number, projectId: number): Promise<any> {
        await this.isEmployerExist(employerId);
        await this.isProjectExist(projectId);
        const Project: ProjectEntity = await ProjectEntity.findOne({
            where: { id: projectId },
            relations: ['employer'],
        });
        await this.validateProjectOwnerAccess(Project, employerId);
        const { bids } = Project;
        if (Project.employer?.id == employerId) {
            return bids;
        }
    }

    async deleteProject(employerId: number, projectId: number): Promise<any> {
        await this.getProject(employerId, projectId);
        return await ProjectEntity.delete({ id: projectId });
    }

    async updateProject(projectEmployerId: number, projectId: number, newProject: ProjectDto): Promise<any> {
        await this.getProject(projectEmployerId, projectId);
        const { employerId, ...ProjectInfo } = newProject;
        return ProjectEntity.update({ id: projectId }, ProjectInfo);
    }

    async setFinalBid(projectEmployerId: number, projectId: number, finalBidId: number): Promise<any> {
        await this.getProject(projectEmployerId, projectId);
        return ProjectEntity.update({ id: projectId }, {finalBidId});
    }
}