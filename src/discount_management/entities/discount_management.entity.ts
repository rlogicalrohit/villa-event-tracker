import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiscountManagement {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    discount_type: string;

    @Column()
    discount_value: number;
}
