import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AllergyCategoryManagement extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column('text')
    description: string;

}


export class ResponseAllergyCategoryManagement {
    data: object;
    status: number;
    message: string
}