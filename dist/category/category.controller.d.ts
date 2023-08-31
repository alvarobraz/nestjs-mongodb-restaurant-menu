import { Category as CategoryModel } from '@prisma/client';
import { CategoryService } from './category.service';
import { ICategoryDTO } from 'src/dto/category';
export declare class CategoryController {
    private readonly category;
    constructor(category: CategoryService);
    create(dataCategory: ICategoryDTO): Promise<CategoryModel>;
    searchCategoriesById(id: string, products: boolean): Promise<import("src/dto/category").ICategoryProductsDTO>;
    updateCategory(id: string, updatedData: Partial<ICategoryDTO>): Promise<{
        categoria: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        messagem: string;
    }>;
    searchCategories(categoryName: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    deleteCategory(id: string): Promise<{
        message: string;
    }>;
}
