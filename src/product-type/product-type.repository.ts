/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Product } from './product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { User } from 'src/user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
    constructor(private dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }

    async createProductType({type}: CreateProductTypeDto, user: User): Promise<Product> {
        const product = this.create({
            type,
            user
        });
        await this.save(product);
        delete product._id;
        return product;
    }

    async getAllProducts(user:  User) : Promise<Product[]> {
        const products = await this.find();
        return products.map((product)=>{
            delete product._id;
            return product;
        });
    }
}
