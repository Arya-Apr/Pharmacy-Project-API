import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRepository } from './medical-product.repository';
import { CreateMedicalProductDto } from './dto/create-medical-product.dto';
import { Medical } from './medical-product.entity';
import { User } from 'src/user/user.entity';
import { EditMedicalProductDto } from './dto/edit-medical-product.dto';

@Injectable()
export class MedicalProductService {
  constructor(
    @InjectRepository(MedicalRepository)
    private readonly medicalRepository: MedicalRepository,
  ) {}

  async createMedicalProduct(
    imagename: string,
    createMedicalProductDto: CreateMedicalProductDto,
    path: string,
    user: User,
  ): Promise<Medical> {
    return this.medicalRepository.createMedicalProduct(
      imagename,
      createMedicalProductDto,
      path,
      user,
    );
  }

  async editProduct(
    imagename: string,
    id: string,
    editProductDto: EditMedicalProductDto,
    path: string,
    user: User,
  ): Promise<Medical> {
    return this.medicalRepository.editProduct(
      imagename,
      id,
      editProductDto,
      path,
      user,
    );
  }

  async getAllMedicalProducts(user: User): Promise<Medical[]> {
    return this.medicalRepository.getAllMedicalProducts(user);
  }

  async getMedicalByType(product_type: string, user: User): Promise<Medical[]> {
    return this.medicalRepository.getMedicalByType(product_type, user);
  }

  async commentOnProduct(
    id: string,
    comment: string,
    user: User,
  ): Promise<void> {
    return this.medicalRepository.commentOnProduct(id, comment, user);
  }

  async likeProduct(id: string, user: User): Promise<void> {
    return this.medicalRepository.likeProduct(id, user);
  }

  async dislikeProduct(id: string, user: User): Promise<void> {
    return this.medicalRepository.dislikeProduct(id, user);
  }

  async getRecent(user: User): Promise<Medical> {
    return this.medicalRepository.getRecent(user);
  }

  async getMostLiked(user: User): Promise<Medical> {
    return this.medicalRepository.getMostLiked(user);
  }

  async deleteMedical(id: string, user: User): Promise<void> {
    return this.medicalRepository.deleteMedical(id, user);
  }
}
