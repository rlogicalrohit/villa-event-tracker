import { CommonEntity } from 'src/common/common.entity';
import { Role } from 'src/role/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User extends CommonEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
}
