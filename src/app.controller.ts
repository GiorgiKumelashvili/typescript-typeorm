import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { UserDetails } from './entities/details.entity';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserDetails)
    private userDetailsRepo: Repository<UserDetails>,
  ) {
    console.log(123);
  }

  @Get()
  async getHello() {
    const users = await this.userRepo.find({
      relations: ['details', 'details.more_details'],
    });
    return users;

    // const users = await this.userRepo.find({ relations: ['details'] });
    // const details = await this.userDetailsRepo.find({ relations: ['user'] });
    // return { details, users };
  }
}
