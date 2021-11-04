import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDetails } from './entities/details.entity';
import { UserDetailsMore } from './entities/detailsmore.entity';
import { UserCountry } from './entities/usercountry.entity';
import { Computer } from './entities/computer.entity';

const entities = [User, UserDetails, UserDetailsMore, UserCountry, Computer];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'giorgi',
      password: 'giorgi',
      database: 'testing_orm',
      entities: entities,
      synchronize: true,
      autoLoadEntities: true,
      keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
