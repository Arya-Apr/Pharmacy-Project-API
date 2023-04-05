/* eslint-disable prettier/prettier */
import { IsString, MaxLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @MaxLength(20)
  username: string;

  @IsString()
  @MaxLength(32)
  password: string;
}
