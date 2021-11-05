import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { Computer } from './entities/computer.entity';
import { UserDetails } from './entities/details.entity';
import { User, UserState } from './entities/user.entity';
import { UserCountry } from './entities/usercountry.entity';

const USER_NAME_1 = 'gio';
const USER_NAME_2 = 'nino';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Computer)
    private computerRepo: Repository<Computer>,
    @InjectRepository(UserDetails)
    private userDetailsRepo: Repository<UserDetails>,
    @InjectRepository(UserCountry)
    private countryRepo: Repository<UserCountry>,
  ) {}

  @Get()
  async getHello() {
    return 'hello';
  }

  @Get('/seed/one-to-one')
  async seedOneToOne() {
    const gio = this.userRepo.create({
      firstName: USER_NAME_1,
      lastName: 'aabababa',
      states: [UserState.ALIVE, UserState.SLEEPY],
    });
    const nino = this.userRepo.create({
      firstName: USER_NAME_2,
      lastName: 'dhdhdh',
      states: [UserState.SLEEPY],
    });

    const amsterdam = this.countryRepo.create({
      name: 'amsterdam',
      user: gio,
    });

    this.userRepo.save([gio, nino]);
    this.countryRepo.save(amsterdam);
  }

  @Get('/seed/many-to-one')
  async seedManyToOne() {
    const gio = await this.userRepo.findOne({
      where: { firstName: USER_NAME_1 },
    });
    const nino = await this.userRepo.findOne({
      where: { firstName: USER_NAME_2 },
    });

    const gioDetails1 = this.userDetailsRepo.create({
      firstName: 'gio 1',
      user: gio,
    });
    const gioDetails2 = this.userDetailsRepo.create({
      firstName: 'gio 2',
      user: gio,
    });
    const gioDetails3 = this.userDetailsRepo.create({
      firstName: 'gio 3',
      user: gio,
    });
    const ninoDetails1 = this.userDetailsRepo.create({
      firstName: 'nino 1',
      user: nino,
    });

    return await this.userDetailsRepo.save([
      gioDetails1,
      gioDetails2,
      gioDetails3,
      ninoDetails1,
    ]);
  }

  @Get('/seed/many-to-many')
  async seedManyToMany() {
    const gio = await this.userRepo.findOne({
      where: { firstName: USER_NAME_1 },
    });
    const nino = await this.userRepo.findOne({
      where: { firstName: USER_NAME_2 },
    });

    const lg = this.computerRepo.create({ name: 'LG' });
    const lenovo = this.computerRepo.create({ name: 'lenovo' });
    const dell = this.computerRepo.create({ name: 'dell' });

    const cresps = await this.computerRepo.save([lg, lenovo, dell]);

    gio.computers = [lg, lenovo, dell];
    nino.computers = [lg, lenovo];

    const r1 = await this.userRepo.save(gio);
    const r2 = await this.userRepo.save(nino);

    return [r1, r2, cresps];
  }

  @Get('/relations/one-to-one')
  async getOneToOne() {
    const users = await this.userRepo.find({
      relations: ['country'],
    });
    return users;
  }

  @Get('/relations/many-to-one')
  async manyToOne() {
    const users = await this.userRepo.find({ relations: ['details'] });
    const details = await this.userDetailsRepo.find({ relations: ['user'] });
    return { details, users };
  }

  @Get('/relations/many-to-one/deep')
  async manyToOneDeep() {
    const users = await this.userRepo.find({
      relations: ['details', 'details.more_details'],
    });

    return users;
  }

  @Get('/relations/many-to-many')
  async getManyToMany() {
    const users = await this.userRepo.find({
      relations: ['computers'],
    });
    return users;
  }

  @Get('/relations/many-to-many/inverse')
  async getManyToManyInverse() {
    const computers = await this.computerRepo.find({
      relations: ['users'],
    });
    return computers;
  }
}
