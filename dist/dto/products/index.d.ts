/// <reference types="multer" />
export interface IProductDTO {
    name: string;
    price?: number;
    image?: Express.Multer.File;
    description: string;
    categoryId: string;
    menuId: string;
}
export interface IUpdateProductDTO {
    name: string;
    price?: number;
    image?: string;
    description: string;
    categoryId: string;
    menuId: string;
}
