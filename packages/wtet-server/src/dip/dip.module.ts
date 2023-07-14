import { Module } from '@nestjs/common';
import { DipService } from './dip.service';
import { DipController } from './dip.controller';

@Module({
  controllers: [DipController],
  providers: [DipService]
})
export class DipModule {}
