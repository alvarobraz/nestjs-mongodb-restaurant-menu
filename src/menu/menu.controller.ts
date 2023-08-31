import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Menu as MenuModel } from '@prisma/client';
import { MenuService } from './menu.service';
import { IMenuDTO } from 'src/dto/menu';

@Controller('menu')
export class MenuController {
  constructor(private readonly menu: MenuService) {}
  @Post()
  async createMenu(@Body() menuData: IMenuDTO): Promise<MenuModel> {
    return this.menu.createMenu(menuData);
  }

  @Get('/:id')
  async searchMenuProductsById(
    @Param('id') id: string,
    @Query('searchProducts') products: boolean,
  ) {
    const menu = await this.menu.searchMenuProductsById(id, products);
    return menu;
  }

  @Get('')
  async searchMenu(
    @Query('searchMenuByName') searchMenuByName: string,
    @Query('searchMenuByType') searchMenuByType: string,
  ): Promise<IMenuDTO[]> {
    const menu = await this.menu.searchMenu(searchMenuByName, searchMenuByType);
    return menu;
  }

  @Delete('/:id')
  async deleteMenu(@Param('id') id: string) {
    const result = await this.menu.deleteMenu(id);
    if (!result) {
      throw new NotFoundException('Menu não encontrado');
    }
    return { message: 'Menu excluído com sucesso' };
  }
}
