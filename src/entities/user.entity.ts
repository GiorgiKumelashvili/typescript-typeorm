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

//! for check
export enum UserState {
  SLEEPY = 'slp',
  ALIVE = 'alv',
}

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

  @Column({ type: 'enum', enum: UserState, array: true })
  states: UserState[]; // for enum array test

  @OneToOne(() => UserCountry, (country) => country.user)
  country: UserCountry;

  @OneToMany(() => UserDetails, (details) => details.user)
  details: UserDetails[];

  @ManyToMany(() => Computer, (computer) => computer.users)
  @JoinTable()
  computers: Computer[];
}
