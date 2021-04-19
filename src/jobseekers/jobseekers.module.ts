import { Module } from '@nestjs/common';
import { JobseekersController } from './jobseekers.controller';
import { JobseekersService } from './jobseekers.service';
import { FreelancersModule } from './freelancers/freelancers.module';
import { EmployersModule } from './employers/employers.module';
import FreelancerEntity from 'src/db/freelancer.entity';
import EmployerEntity from 'src/db/employer.entity';
import ProjectEntity from 'src/db/project.entity';
import BidEntity from 'src/db/bid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';

@Module({
  controllers: [JobseekersController],
  providers: [JobseekersService],
  imports: [
    FreelancersModule,
    EmployersModule,
    ProjectsModule,

    TypeOrmModule.forFeature([
      FreelancerEntity,
      EmployerEntity,
      ProjectEntity,
      BidEntity
    ]),

    TypeOrmModule.forRoot(),
  ],
})
export class JobseekersModule {}
