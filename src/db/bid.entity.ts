import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import FreelancerEntity from './freelancer.entity';
import ProjectEntity from './project.entity';

@Entity()
export default class BidEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    offeredPrice: number;

    @Column({ length: 10 })
    deadlineToDo: string;

    @Column()
    prepayment: number;

    @Column()
    expertiseGuarantee: number;

    @Column({ length: 10 })
    validityDuration: string;

    @Column({ length: 500 })
    descriptionText: string;

    @Column({ length: 500 })
    descriptionFile: string;

    @ManyToOne((type) => FreelancerEntity, (freelancer) => freelancer.bids)
    freelancer: FreelancerEntity;

    @ManyToOne((type) => ProjectEntity, (project) => project.id)
    project: ProjectEntity;
}
