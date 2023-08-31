/// <reference types="multer" />
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { IProductDTO } from 'src/dto/products';
export declare class ProductController {
    private readonly product;
    constructor(product: ProductService);
    createProduct(productData: IProductDTO, file: Express.Multer.File): Promise<ProductModel>;
    searchById(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        image: string;
        description: string;
        categoryId: string;
        menuId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProducts(id: string, updatedData: Partial<IProductDTO>): Promise<{
        produto: {
            id: string;
            name: string;
            price: number;
            image: string;
            description: string;
            categoryId: string;
            menuId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        messagem: string;
    }>;
    searchProducts(categoryName: string): Promise<{
        id: string;
        name: string;
        price: number;
        image: string;
        description: string;
        categoryId: string;
        menuId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
}
