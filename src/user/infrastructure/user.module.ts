import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { UserService } from '../application/services/user.service';
import { OrmUserRepository } from './repositories/orm-user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, OrmUserRepository],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class UserModule {}
