/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { Medical } from 'src/medical-product/medical-product.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  
  @ObjectIdColumn()
  _id: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @ManyToOne((_type)=>User, (user)=> user.products, {eager: false})
  @Exclude({toPlainOnly:true})
  user: User;

  @OneToMany((_type)=> Medical, (medical)=> medical.product_type, {eager: false})
  medical_products: Medical[];
}
