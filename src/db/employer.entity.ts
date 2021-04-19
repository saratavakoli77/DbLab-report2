import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import ProjectEntity from './project.entity';

@Entity()
export default class EmployerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ length: 500 })
    email: string;

    @Column({ length: 11 })
    phoneNumber: string;

    @Column({ length: 50 })
    password: string;

    @Column({ length: 500 })
    image: string;

    @OneToMany((type) => ProjectEntity, (project) => project.employer)
    projects: ProjectEntity[];
}
