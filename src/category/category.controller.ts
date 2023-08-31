import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Category as CategoryModel } from '@prisma/client';
import { CategoryService } from './category.service';
import { ICategoryDTO } from 'src/dto/category';

@Controller('category')
export class CategoryController {
  constructor(private readonly category: CategoryService) {}
  @Post()
  async create(@Body() dataCategory: ICategoryDTO): Promise<CategoryModel> {
    return this.category.createCategory(dataCategory);
  }

  @Get('/:id')
  async searchCategoriesById(
    @Param('id') id: string,
    @Query('searchProducts') products: boolean,
  ) {
    const category = await this.category.searchCategoriesById(id, products);
    return category;
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updatedData: Partial<ICategoryDTO>,
  ) {
    const category = await this.category.updateCategory(id, updatedData);
    return {
      categoria: category,
      messagem: 'categoria atualizado com sucesso',
    };
  }

  @Get('')
  async searchCategories(@Query('categoryName') categoryName: string) {
    const categories = await this.category.searchCategories(categoryName);
    return categories;
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    const result = await this.category.deleteCategory(id);
    if (!result) {
      throw new NotFoundException('categoria não encontrada');
    }
    return { message: 'Categoria excluída com sucesso' };
  }
}
