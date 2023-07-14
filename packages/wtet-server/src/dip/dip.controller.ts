import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {DipService} from './dip.service';
import {CreateDipDto} from './dto/create-dip.dto';
import {UpdateDipDto} from './dto/update-dip.dto';

@Controller('dip')
export class DipController {
  constructor(private readonly dipService: DipService) {}

  @Post()
  create(@Body() createDipDto: CreateDipDto) {
    return this.dipService.create(createDipDto);
  }

  @Get()
  async findAll() {
    return await this.dipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDipDto: UpdateDipDto) {
    return this.dipService.update(+id, updateDipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dipService.remove(+id);
  }
}
