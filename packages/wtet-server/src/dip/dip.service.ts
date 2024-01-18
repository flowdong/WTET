import { Injectable } from '@nestjs/common';
import { CreateDipDto } from './dto/create-dip.dto';
import { UpdateDipDto } from './dto/update-dip.dto';
import * as dip from 'dipiper';
import {da} from "date-fns/locale";
@Injectable()
export class DipService {
  create(createDipDto: CreateDipDto) {
    return 'This action adds a new dip';
  }

  findAll() {
    return dip.stock.trading.getMin('sh600005');
  }

  findOne(id: number) {
    return `This action returns a #${id} dip`;
  }

  update(id: number, updateDipDto: UpdateDipDto) {
    return `This action updates a #${id} dip`;
  }

  remove(id: number) {
    return `This action removes a #${id} dip`;
  }
}
