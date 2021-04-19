import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import BidEntity from './bid.entity';

@Entity()
export default class FreelancerEntity extends BaseEntity {
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

    @Column({ length: 500 })
    username: string;

    @Column({ length: 500 })
    skills: string;

    @Column()
    degrees: string;

    @Column({ length: 500 })
    experiences: string;

    @Column({ length: 500 })
    resumeFile: string;

    @OneToMany((type) => BidEntity, (bid) => bid.freelancer)
    bids: BidEntity[];
}
