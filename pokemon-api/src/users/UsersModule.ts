import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controlers/users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users.repository';
import { UserSchema } from './schemas/userSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema, collection: 'users' }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository], 
})
export class UsersModule {}