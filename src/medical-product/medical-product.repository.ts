/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Medical } from './medical-product.entity';
import { CreateMedicalProductDto } from './dto/create-medical-product.dto';
import { v4 as uuid } from 'uuid';
import { User } from 'src/user/user.entity';
import { EditMedicalProductDto } from './dto/edit-medical-product.dto';


@Injectable()
export class MedicalRepository extends Repository<Medical> {

    constructor(private dataSource: DataSource) {
        super(Medical, dataSource.createEntityManager());
    }

    async createMedicalProduct(imagename: string, createMedicalProductDto: CreateMedicalProductDto, path: string, user: User): Promise<Medical> {
        const { name, product_type, like } = createMedicalProductDto;
        const past = await this.find({where: {recent: 1}});
        past.map((p)=>{
            p.recent=0;
            return p;
        })
        await this.save(past);

        const medical = this.create({
            id: uuid(),
            name,
            image: imagename,
            product_type,
            likes: +like,
            comment: [],
            recent: 1,
            path,
            user,
        });
        await this.save(medical);
        delete medical._id;
        return medical;
    }

    async editProduct(
        imagename: string,
        id: string,
        editProductDto: EditMedicalProductDto,
        path: string,
        user: User,): Promise<Medical> 
        {
            const past = await this.find({where: {recent: 1}});
        past.map((p)=>{
            p.recent=0;
            return p;
        });
        await this.save(past);
        const { name, product_type } = editProductDto;
        const med = await this.getMedicalById(id, user);
        med.name=name;
        med.image = imagename;
        med.product_type = product_type;
        med.path = path;
        med.recent=1;
        await this.save(med);
        delete med.path;
        delete med._id;
        return med;
    }

    async getAllMedicalProducts(user: User): Promise<Medical[]> {
        const products = await this.find();
        return products.map((product)=>{
            delete product._id;
            delete product.path;
            delete product.recent;
            return product;
        });
    }

    async getMedicalByType(product_type: string, user: User): Promise<Medical[]> {
        const products = await this.find({
            where: {
                product_type,
            }
        });
        return products.map((product)=> {
            delete product._id;
            delete product.recent;
            delete product.path;
            return product;
        });
    }

    async getMedicalById(id: string, user: User): Promise<Medical> {
        const medical = this.findOne({where:{id}});
        return medical;
    }

    async commentOnProduct(id: string, comment: string, user: User): Promise<void> {
        const past = await this.find({where: {recent: 1}});
        past.map((p)=>{
            p.recent=0;
            return p;
        });
        const med = await this.getMedicalById(id, user);
        med.recent = 1;
        (med?.comment || []).push(comment);
        await this.save(med);
    }

    async likeProduct(id: string, user:User) : Promise<void> {
        const past = await this.find({where: {recent: 1}});
        past.map((p)=>{
            p.recent=0;
            return p;
        });
        const med = await this.getMedicalById(id, user);
        med.likes+=1;
        med.recent=1;
        await this.save(med);
    }

    async dislikeProduct(id: string, user:User) : Promise<void> {
        const past = await this.find({where: {recent: 1}});
        past.map((p)=>{
            p.recent=0;
            return p;
        });
        const med = await this.getMedicalById(id, user);
        med.likes-=1;
        med.recent=1;
        await this.save(med);
    }

    async deleteMedical(id: string, user: User) : Promise<void> {
        await this.delete({id});
    }

    async getRecent(user: User): Promise<Medical> {
        const recent = await this.findOneBy({recent:1});
        delete recent._id;  
        return await recent;
    }

    async getMostLiked(user:User): Promise<Medical> {
        const mostLiked = await this.findOne({
            order: {
                likes: 'DESC',
            },
        });
        delete mostLiked._id;
        delete mostLiked.recent;
        return mostLiked;
    }
}