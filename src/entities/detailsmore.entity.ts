import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserDetails } from './details.entity';
import { User } from './user.entity';

@Entity()
export class UserDetailsMore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @ManyToOne(() => UserDetails, (details) => details.more_details)
  details: UserDetails;

  //   @ManyToOne(() => UserDetailsMore, (more) => more.details)
  //   more_details: UserDetailsMore;
}
