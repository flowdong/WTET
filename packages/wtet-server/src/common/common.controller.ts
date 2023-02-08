import { Controller } from '@nestjs/common';
//import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommonService } from './common.service';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';

@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

 /* @MessagePattern('createCommon')
  create(@Payload() createCommonDto: CreateCommonDto) {
    return this.commonService.create(createCommonDto);
  }

  @MessagePattern('findAllCommon')
  findAll() {
    return this.commonService.findAll();
  }

  @MessagePattern('findOneCommon')
  findOne(@Payload() id: number) {
    return this.commonService.findOne(id);
  }

  @MessagePattern('updateCommon')
  update(@Payload() updateCommonDto: UpdateCommonDto) {
    return this.commonService.update(updateCommonDto.id, updateCommonDto);
  }

  @MessagePattern('removeCommon')
  remove(@Payload() id: number) {
    return this.commonService.remove(id);
  }*/
}
