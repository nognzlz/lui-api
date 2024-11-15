import { Injectable } from '@nestjs/common';
import { Menu } from './menu.entity';
import { updateMenuDTO } from './dto/menu.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  findAll(queryParams: { isDaysMenu: boolean }): Promise<Menu[]> {
    const { isDaysMenu } = queryParams;
    const opts =
      typeof isDaysMenu !== 'undefined' ? { where: { isDaysMenu } } : {};
    return this.menuRepository.find(opts);
  }

  findOne(id: number): Promise<Menu> {
    return this.menuRepository.findOne({ where: { id } });
  }

  create(name: string, price: number, description: string, imageUrl: string) {
    const menu = {
      name,
      price,
      description,
      imageUrl,
    };

    const newMenu = this.menuRepository.create(menu);
    return this.menuRepository.save(newMenu);
  }

  delete(id: number) {
    return this.menuRepository.delete(id);
  }

  async update(id: number, updatedFields: updateMenuDTO) {
    const menu = await this.menuRepository.findOne({ where: { id } });

    if (!menu) {
      throw new Error('Menu not found');
    }

    const newMenu = Object.assign(menu, updatedFields);
    return this.menuRepository.save(newMenu);
  }
}
