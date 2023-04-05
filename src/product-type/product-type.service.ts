import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product-type.repository';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { Product } from './product-type.entity';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productTypeRepository: ProductRepository,
  ) {}

  async createProductType(
    createProductTypeDto: CreateProductTypeDto,
    user: User,
  ): Promise<Product> {
    return this.productTypeRepository.createProductType(
      createProductTypeDto,
      user,
    );
  }

  async getAllProducts(user: User): Promise<Product[]> {
    return this.productTypeRepository.getAllProducts(user);
  }
}
