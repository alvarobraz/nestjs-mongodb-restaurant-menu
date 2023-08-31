import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
})
export class MenuModule {}
