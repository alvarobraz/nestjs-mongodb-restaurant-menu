import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [UserModule, ProductModule, CategoryModule, MenuModule],
})
export class AppModule {}
