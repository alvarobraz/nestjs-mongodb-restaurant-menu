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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCategory(categoryData) {
        const nameExists = await this.searchCategories(categoryData.name);
        if (nameExists.length)
            throw new common_1.NotFoundException('O nome desta categoria já existe.');
        const create = await this.prisma.category.create({ data: categoryData });
        return create;
    }
    async searchCategoriesById(id, products) {
        const categoryWithProducts = await this.prisma.category.findUnique({
            where: { id },
            include: {
                products: products,
            },
        });
        if (!categoryWithProducts) {
            throw new common_1.NotFoundException('A categoria não existe.');
        }
        return categoryWithProducts;
    }
    async updateCategory(id, updatedData) {
        const categoryExists = await this.searchCategories(updatedData.name);
        if (categoryExists.length)
            throw new common_1.NotFoundException('A categoria já existe.');
        const updateCategory = await this.prisma.category.update({
            where: { id },
            data: updatedData,
        });
        return updateCategory;
    }
    async searchCategories(categoryName) {
        if (categoryName) {
            const categoriePerName = await this.prisma.category.findMany({
                where: { name: categoryName },
            });
            if (categoriePerName === null)
                throw new common_1.NotFoundException('A categoria não existe.');
            return categoriePerName;
        }
        const categories = await this.prisma.category.findMany();
        return categories;
    }
    async deleteCategory(id) {
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
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map