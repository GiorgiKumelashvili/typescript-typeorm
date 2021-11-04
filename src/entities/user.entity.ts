import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Computer } from './computer.entity';
import { UserDetails } from './details.entity';
import { UserCountry } from './usercountry.entity';

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

  @OneToOne(() => UserCountry, (country) => country.user)
  country: UserCountry;

  @ManyToMany(() => Computer, (computer) => computer.users)
  @JoinTable()
  computers: Computer[];
}
