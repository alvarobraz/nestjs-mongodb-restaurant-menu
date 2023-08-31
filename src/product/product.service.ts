import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { IProductDTO } from 'src/dto/products';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(
    productDTO: IProductDTO,
    file: Express.Multer.File,
  ): Promise<Product> {
    console.log(file);

    const uploadDirectory = path.join(__dirname, '..', '..', 'public', 'img');
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    const { name } = productDTO;
    const nameExists = await this.searchByName(name);
    if (nameExists)
      throw new NotFoundException('O nome deste produto já existe.');
    const filePath = `${uploadDirectory}/${file.originalname}`;

    try {
      fs.writeFileSync(filePath, file.buffer);
    } catch (error) {
      console.error('Erro ao salvar o arquivo:', error);
    }

    const price = parseFloat(productDTO.price.toString());

    const createdProduct = await this.prisma.product.create({
      data: {
        ...productDTO,
        price,
        image: file.originalname,
      },
    });

    return createdProduct;
  }

  async searchByName(name: string): Promise<boolean> {
    const checkProductByName = await this.prisma.product.findFirst({
      where: { name },
    });
    if (checkProductByName === null) return false;
    return true;
  }

  async searchById(id: string): Promise<Product> {
    const checkProductById = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    if (!checkProductById) throw new NotFoundException('O produto não existe.');
    return checkProductById;
  }

  async updateProducts(
    id: string,
    updatedData: Partial<any>,
  ): Promise<Product> {
    const updateProduct = await this.prisma.product.update({
      where: { id },
      data: updatedData,
    });
    return updateProduct;
  }

  async searchProducts(categoryName: string): Promise<Product[]> {
    const productsWithCategories = await this.prisma.product.findMany({
      include: {
        category: true,
        menu: true,
      },
    });

    if (categoryName && (categoryName === 'asc' || categoryName === 'desc')) {
      const sortedProducts = productsWithCategories.sort((a, b) =>
        categoryName === 'asc'
          ? a.category.name.localeCompare(b.category.name)
          : b.category.name.localeCompare(a.category.name),
      );
      return sortedProducts;
    }

    return productsWithCategories;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const productExists = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      return false;
    }
    await this.prisma.product.delete({
      where: { id },
    });

    return true;
  }
}
