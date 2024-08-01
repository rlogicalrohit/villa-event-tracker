import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class HallManagement {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    capacity: number;

    @Column("text")
    description: string;
}
