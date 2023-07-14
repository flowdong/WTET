import { PartialType } from '@nestjs/mapped-types';
import { CreateDipDto } from './create-dip.dto';

export class UpdateDipDto extends PartialType(CreateDipDto) {}
