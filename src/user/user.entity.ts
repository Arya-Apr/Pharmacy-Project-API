/* eslint-disable prettier/prettier */
import { Medical } from 'src/medical-product/medical-product.entity';
import { Product } from 'src/product-type/product-type.entity';
import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @ObjectIdColumn()
    _id: string;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @OneToMany(_type=> Product, product=> product.user, {eager: true})
    products: Product[];

    @OneToMany(_type => Medical, medical => medical.user, { eager: true })
    medical: Medical[];
}