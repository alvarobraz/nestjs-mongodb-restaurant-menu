import { Category } from '@prisma/client';
import { ICategoryDTO, ICategoryProductsDTO } from 'src/dto/category';
import { PrismaService } from 'src/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    createCategory(categoryData: ICategoryDTO): Promise<Category>;
    searchCategoriesById(id: string, products: boolean): Promise<ICategoryProductsDTO>;
    updateCategory(id: string, updatedData: Partial<ICategoryDTO>): Promise<Category>;
    searchCategories(categoryName: string): Promise<Category[]>;
    deleteCategory(id: string): Promise<boolean>;
}
