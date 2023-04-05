import { Module } from '@nestjs/common';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product-type.entity';
import { ProductRepository } from './product-type.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UserModule],
  controllers: [ProductTypeController],
  providers: [ProductTypeService, ProductRepository],
})
export class ProductTypeModule {}
