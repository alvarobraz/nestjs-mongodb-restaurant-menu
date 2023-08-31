import { Menu } from '@prisma/client';
import { IMenuDTO } from 'src/dto/menu/index';
import { PrismaService } from 'src/prisma.service';
export declare class MenuService {
    private prisma;
    constructor(prisma: PrismaService);
    createMenu(menuData: IMenuDTO): Promise<Menu>;
    searchMenuProductsById(id: string, products: boolean): Promise<any>;
    searchMenu(searchMenuByName?: string, searchMenuByType?: string): Promise<IMenuDTO[]>;
    deleteMenu(id: string): Promise<boolean>;
}
