import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { IMenuDTO } from 'src/dto/menu/index';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async createMenu(menuData: IMenuDTO): Promise<Menu> {
    const checkMenuexists = await this.searchMenu(menuData.name);
    if (checkMenuexists.length)
      throw new NotFoundException('O menu já existe.');
    const createMenu = await this.prisma.menu.create({ data: menuData });
    console.log(createMenu);
    return createMenu;
  }

  async searchMenuProductsById(id: string, products: boolean): Promise<any> {
    const menuWithProducts = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        products: products,
      },
    });

    if (!menuWithProducts) {
      throw new NotFoundException('O menu não existe.');
    }
    return menuWithProducts;
  }

  async searchMenu(
    searchMenuByName?: string,
    searchMenuByType?: string,
  ): Promise<IMenuDTO[]> {
    const time = new Date();
    const currentHour = time.getHours();

    if (searchMenuByName) {
      const menuByName = await this.prisma.menu.findMany({
        where: { name: searchMenuByName },
      });
      return menuByName;
    }

    if (searchMenuByType) {
      const menuByType = await this.prisma.menu.findMany({
        where: { type: searchMenuByType },
      });
      return menuByType;
    }

    if (currentHour >= 18 || currentHour < 6) {
      console.log(currentHour);
      const menuByType = await this.prisma.menu.findMany({
        where: { type: 'Noturno' },
      });
      return menuByType;
    }

    if (currentHour < 18 || currentHour < 6) {
      console.log(currentHour);
      const menuByType = await this.prisma.menu.findMany({
        where: { type: 'Diurno' },
      });
      return menuByType;
    }

    const menu = await this.prisma.menu.findMany();
    return menu;
  }

  async deleteMenu(id: string): Promise<boolean> {
    const menuExists = await this.prisma.menu.findUnique({
      where: { id },
    });

    if (!menuExists) {
      return false;
    }
    await this.prisma.menu.delete({
      where: { id },
    });

    return true;
  }
}
