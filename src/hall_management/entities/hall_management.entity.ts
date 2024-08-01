import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class HallManagement extends CommonEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    capacity: number;

    @Column("text")
    description: string;
}
