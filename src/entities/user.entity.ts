import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserDetails } from './details.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UserDetails, (details) => details.user)
  details: UserDetails[];
}
