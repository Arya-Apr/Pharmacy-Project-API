import { Module } from '@nestjs/common';
import { MedicalProductController } from './medical-product.controller';
import { MedicalProductService } from './medical-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medical } from './medical-product.entity';
import { ProductTypeModule } from 'src/product-type/product-type.module';
import { MedicalRepository } from './medical-product.repository';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medical]),
    MulterModule.register({
      dest: './uploads',
    }),
    ProductTypeModule,
    UserModule,
  ],
  controllers: [MedicalProductController],
  providers: [MedicalProductService, MedicalRepository],
})
export class MedicalProductModule {}
