import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class EventCategory extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}
