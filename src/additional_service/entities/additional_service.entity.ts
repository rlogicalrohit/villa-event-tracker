import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
