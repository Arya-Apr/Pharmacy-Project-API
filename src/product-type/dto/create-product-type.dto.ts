/* eslint-disable prettier/prettier */
import { IsString, MaxLength } from "class-validator";

export class CreateProductTypeDto {
    @IsString()
    @MaxLength(32)
    type: string;
}