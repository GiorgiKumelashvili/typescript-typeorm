import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserDetailsMore } from './detailsmore.entity';
import { User } from './user.entity';

@Entity()
export class UserDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @ManyToOne(() => User, (user) => user.details)
  user: User;

  @OneToMany(() => UserDetailsMore, (more) => more.details)
  more_details: UserDetailsMore[];
}
