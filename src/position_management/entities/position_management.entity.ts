import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PositionManagement extends CommonEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column('text')
    description: string;
}
