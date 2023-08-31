/// <reference types="multer" />
import { Product } from '@prisma/client';
import { IProductDTO } from 'src/dto/products';
import { PrismaService } from 'src/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    createProduct(productDTO: IProductDTO, file: Express.Multer.File): Promise<Product>;
    searchByName(name: string): Promise<boolean>;
    searchById(id: string): Promise<Product>;
    updateProducts(id: string, updatedData: Partial<any>): Promise<Product>;
    searchProducts(categoryName: string): Promise<Product[]>;
    deleteProduct(id: string): Promise<boolean>;
}
