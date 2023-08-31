import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { ICategoryDTO, ICategoryProductsDTO } from 'src/dto/category';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(categoryData: ICategoryDTO): Promise<Category> {
    const nameExists = await this.searchCategories(categoryData.name);
    if (nameExists.length)
      throw new NotFoundException('O nome desta categoria já existe.');

    const create = await this.prisma.category.create({ data: categoryData });
    return create;
  }

  async searchCategoriesById(
    id: string,
    products: boolean,
  ): Promise<ICategoryProductsDTO> {
    const categoryWithProducts = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: products,
      },
    });

    if (!categoryWithProducts) {
      throw new NotFoundException('A categoria não existe.');
    }
    return categoryWithProducts;
  }

  async updateCategory(
    id: string,
    updatedData: Partial<ICategoryDTO>,
  ): Promise<Category> {
    const categoryExists = await this.searchCategories(updatedData.name);
    if (categoryExists.length)
      throw new NotFoundException('A categoria já existe.');

    const updateCategory = await this.prisma.category.update({
      where: { id },
      data: updatedData,
    });
    return updateCategory;
  }

  async searchCategories(categoryName: string): Promise<Category[]> {
    if (categoryName) {
      const categoriePerName = await this.prisma.category.findMany({
        where: { name: categoryName },
      });

      if (categoriePerName === null)
        throw new NotFoundException('A categoria não existe.');
      return categoriePerName;
    }

    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      return false;
    }
    await this.prisma.category.delete({
      where: { id },
    });

    return true;
  }
}
