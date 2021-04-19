import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BidEntity from './bid.entity';
import EmployerEntity from './employer.entity';

@Entity()
export default class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    title: string;

    @Column({ length: 500 })
    subject: string;

    @Column({ length: 500 })
    requiredSkills: string;

    @Column({ length: 500 })
    descriptionText: string;

    @Column({ length: 500 })
    descriptionFile: string;

    @Column()
    size: number;

    @Column()
    budget: number;

    @Column()
    minimumGuarantee: number;

    @Column({ length: 10 })
    deadline: string;

    @Column({ length: 500 })
    type: string;

    @ManyToOne((type) => EmployerEntity, (employer) => employer.projects)
    employer: EmployerEntity;

    @OneToMany((type) => BidEntity, (bid) => bid.project)
    bids: BidEntity[];

    @Column()
    finalBidId: number;
}
