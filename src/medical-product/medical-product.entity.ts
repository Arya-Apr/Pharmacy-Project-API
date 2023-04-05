/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { Product } from 'src/product-type/product-type.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medical {

    @ObjectIdColumn()
    _id: string;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @ManyToOne((_type) => Product, (product) => product.medical_products, { eager: true })
    product_type: string;

    @Column()
    recent: number;

    @Column()
    likes: number;

    @Column('array', { default: [] })
    comment: string[];

    @Column()
    path: string;

    @ManyToOne((_type) => User, (user) => user.medical, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User;

}