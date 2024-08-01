import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('additional_service_management')
export class AdditionalService {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column('text')
    description: string;
}
