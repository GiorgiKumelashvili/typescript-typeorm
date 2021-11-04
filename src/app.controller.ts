import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { Computer } from './entities/computer.entity';
import { UserDetails } from './entities/details.entity';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Computer)
    private computerRepo: Repository<Computer>,
  ) {
    console.log(123);
  }

  @Get()
  async getHello() {
    const computers = await this.computerRepo.find({
      relations: ['users'],
    });
    return computers;

    //! many to many inverse
    // const users = await this.userRepo.find({
    //   relations: ['computers'],
    // });
    // return users;

    //! one to one inverse
    // const users = await this.userRepo.find({
    //   relations: ['country'],
    // });
    // return users;

    //! many to one
    // const users = await this.userRepo.find({ relations: ['details'] });
    // const details = await this.userDetailsRepo.find({ relations: ['user'] });
    // return { details, users };

    //! many to one deep relation
    // const users = await this.userRepo.find({
    //   relations: ['details', 'details.more_details'],
    // });
    // return users;
  }
}
