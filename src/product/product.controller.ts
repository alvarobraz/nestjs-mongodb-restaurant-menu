import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Product as ProductModel } from '@prisma/client';
import { ProductService } from './product.service';
import { IProductDTO } from 'src/dto/products';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly product: ProductService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() productData: IProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProductModel> {
    return this.product.createProduct(productData, file);
  }

  @Get('/:id')
  async searchById(@Param('id') id: string) {
    const product = await this.product.searchById(id);
    return product;
  }

  @Put('/:id')
  async updateProducts(
    @Param('id') id: string,
    @Body() updatedData: Partial<IProductDTO>,
  ) {
    const product = await this.product.updateProducts(id, updatedData);
    return {
      produto: product,
      messagem: 'Produto atualizado com sucesso',
    };
  }

  @Get('')
  async searchProducts(@Query('orderByCategoryName') categoryName: string) {
    const productsCategoriesByName =
      await this.product.searchProducts(categoryName);
    return productsCategoriesByName;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const result = await this.product.deleteProduct(id);
    if (!result) {
      throw new NotFoundException('Produto não encontrada');
    }
    return { message: 'Produto excluído com sucesso' };
  }
}
