import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { Product } from './product-type.entity';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/user/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('product-type')
@UseGuards(AuthGuard())
export class ProductTypeController {
  constructor(private productTypeService: ProductTypeService) {}

  @Post()
  createProductType(
    @Body() createProductTypeDto: CreateProductTypeDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productTypeService.createProductType(
      createProductTypeDto,
      user,
    );
  }

  @Get()
  getAllProducts(@GetUser() user: User): Promise<Product[]> {
    return this.productTypeService.getAllProducts(user);
  }
}
