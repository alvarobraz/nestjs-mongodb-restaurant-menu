"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const fs = require("fs");
const path = require("path");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProduct(productDTO, file) {
        console.log(file);
        const uploadDirectory = path.join(__dirname, '..', '..', 'public', 'img');
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory);
        }
        const { name } = productDTO;
        const nameExists = await this.searchByName(name);
        if (nameExists)
            throw new common_1.NotFoundException('O nome deste produto já existe.');
        const filePath = `${uploadDirectory}/${file.originalname}`;
        try {
            fs.writeFileSync(filePath, file.buffer);
        }
        catch (error) {
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
    async searchByName(name) {
        const checkProductByName = await this.prisma.product.findFirst({
            where: { name },
        });
        if (checkProductByName === null)
            return false;
        return true;
    }
    async searchById(id) {
        const checkProductById = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        if (!checkProductById)
            throw new common_1.NotFoundException('O produto não existe.');
        return checkProductById;
    }
    async updateProducts(id, updatedData) {
        const updateProduct = await this.prisma.product.update({
            where: { id },
            data: updatedData,
        });
        return updateProduct;
    }
    async searchProducts(categoryName) {
        const productsWithCategories = await this.prisma.product.findMany({
            include: {
                category: true,
                menu: true,
            },
        });
        if (categoryName && (categoryName === 'asc' || categoryName === 'desc')) {
            const sortedProducts = productsWithCategories.sort((a, b) => categoryName === 'asc'
                ? a.category.name.localeCompare(b.category.name)
                : b.category.name.localeCompare(a.category.name));
            return sortedProducts;
        }
        return productsWithCategories;
    }
    async deleteProduct(id) {
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
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map