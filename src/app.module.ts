import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ProductTypeModule } from './product-type/product-type.module';
import { Product } from './product-type/product-type.entity';
import { MedicalProductModule } from './medical-product/medical-product.module';
import { Medical } from './medical-product/medical-product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://arya:arya1234@cluster0.5dbxggj.mongodb.net/pharmacy?retryWrites=true&w=majority',
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [User, Product, Medical],
    }),
    UserModule,
    ProductTypeModule,
    MedicalProductModule,
  ],
})
export class AppModule {}
