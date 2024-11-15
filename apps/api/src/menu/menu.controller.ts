import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDTO, updateMenuDTO } from './dto/menu.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OptionalParseBoolPipe } from './pipes/OptionalParseBoolPipe';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  findAll(@Query('isDaysMenu', OptionalParseBoolPipe) isDaysMenu?: boolean) {
    return this.menuService.findAll({ isDaysMenu });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() menu: CreateMenuDTO) {
    const { name, price, description, imageUrl } = menu;

    return this.menuService.create(name, price, description, imageUrl);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: number) {
    return this.menuService.delete(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updatedFields: updateMenuDTO) {
    return this.menuService.update(id, updatedFields);
  }
}
