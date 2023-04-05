import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MedicalProductService } from './medical-product.service';
import { CreateMedicalProductDto } from './dto/create-medical-product.dto';
import { Medical } from './medical-product.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { EditMedicalProductDto } from './dto/edit-medical-product.dto';

@Controller('medical-product')
@UseGuards(AuthGuard())
export class MedicalProductController {
  constructor(private medicalService: MedicalProductService) {}

  //   @Post()
  //   @UseInterceptors(FilesInterceptor('image'))
  //   createMedicalProduct(
  //     @UploadedFile() image: Express.Multer.File,
  //     createMedicalProductDto: CreateMedicalProductDto,
  //   ): Promise<Medical> {
  //     return this.medicalService.createMedicalProduct(
  //       image,
  //       createMedicalProductDto,
  //     );
  //   }
  @Get('/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads' });
  }
  @Patch('/:id/edit')
  @UseInterceptors(FilesInterceptor('image'))
  editProduct(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
    @Body() editProductDto: EditMedicalProductDto,
    @GetUser() user: User,
  ): Promise<Medical> {
    const a = file[0];
    return this.medicalService.editProduct(
      a.originalname,
      id,
      editProductDto,
      a.path,
      user,
    );
  }

  @Get('/recent')
  getRecent(@GetUser() user: User): Promise<Medical> {
    return this.medicalService.getRecent(user);
  }

  @Get('/mostLiked')
  getMostLiked(@GetUser() user: User): Promise<Medical> {
    return this.medicalService.getMostLiked(user);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  createMedicalProduct(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: Express.Multer.File,
    @Body() createMedicalProductDto: CreateMedicalProductDto,
    @GetUser() user: User,
  ): Promise<Medical> {
    const a = file[0];
    return this.medicalService.createMedicalProduct(
      a.originalname,
      createMedicalProductDto,
      a.path,
      user,
    );
  }

  @Get()
  getAllMedicalProducts(@GetUser() user: User): Promise<Medical[]> {
    return this.medicalService.getAllMedicalProducts(user);
  }

  @Get('/:product_type')
  getMedicalByType(
    @Param('product_type') product_type: string,
    @GetUser() user: User,
  ): Promise<Medical[]> {
    return this.medicalService.getMedicalByType(product_type, user);
  }

  @Patch('/comment/:id')
  commentOnProduct(
    @Body('comment') comment: string,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.medicalService.commentOnProduct(id, comment, user);
  }

  @Patch('/:id/like')
  likeProduct(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.medicalService.likeProduct(id, user);
  }

  @Patch('/:id/dislike')
  dislikeProduct(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.medicalService.dislikeProduct(id, user);
  }

  @Delete('/:id/delete')
  deleteMedical(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.medicalService.deleteMedical(id, user);
  }
}
