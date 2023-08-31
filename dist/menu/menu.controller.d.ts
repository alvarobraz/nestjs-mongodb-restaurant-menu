import { Menu as MenuModel } from '@prisma/client';
import { MenuService } from './menu.service';
import { IMenuDTO } from 'src/dto/menu';
export declare class MenuController {
    private readonly menu;
    constructor(menu: MenuService);
    createMenu(menuData: IMenuDTO): Promise<MenuModel>;
    searchMenuProductsById(id: string, products: boolean): Promise<any>;
    searchMenu(searchMenuByName: string, searchMenuByType: string): Promise<IMenuDTO[]>;
    deleteMenu(id: string): Promise<{
        message: string;
    }>;
}
