import { Module } from '@nestjs/common';
import { ArrenaService } from './services/arrena.service';
import { ArrenaRepository } from './repositories/arrena.repository';
import { ArrenaController } from './controllers/arrena.controller';

@Module({
  providers: [ArrenaService, ArrenaRepository],
  controllers: [ArrenaController],
  exports: [ArrenaService, ArrenaRepository],
})
export class ArrenaModule {}
