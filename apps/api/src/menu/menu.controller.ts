import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDTO, updateMenuDTO } from './dto/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }

  @Post()
  create(@Body() product: CreateMenuDTO) {
    const { name, price, description, imageUrl } = product;

    return this.menuService.create(name, price, description, imageUrl);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.menuService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatedFields: updateMenuDTO) {
    return this.menuService.update(id, updatedFields);
  }
}
