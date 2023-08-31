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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
let MenuController = class MenuController {
    constructor(menu) {
        this.menu = menu;
    }
    async createMenu(menuData) {
        return this.menu.createMenu(menuData);
    }
    async searchMenuProductsById(id, products) {
        const menu = await this.menu.searchMenuProductsById(id, products);
        return menu;
    }
    async searchMenu(searchMenuByName, searchMenuByType) {
        const menu = await this.menu.searchMenu(searchMenuByName, searchMenuByType);
        return menu;
    }
    async deleteMenu(id) {
        const result = await this.menu.deleteMenu(id);
        if (!result) {
            throw new common_1.NotFoundException('Menu não encontrado');
        }
        return { message: 'Menu excluído com sucesso' };
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "createMenu", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('searchProducts')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "searchMenuProductsById", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('searchMenuByName')),
    __param(1, (0, common_1.Query)('searchMenuByType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "searchMenu", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "deleteMenu", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
//# sourceMappingURL=menu.controller.js.map