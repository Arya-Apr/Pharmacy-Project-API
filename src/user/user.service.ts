import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtPayload } from './jwt-user-payload';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRespository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.usersRespository.createUser(createUserDto);
  }

  async loginUser(
    loginUserDto: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginUserDto;
    const user = await this.usersRespository.findOne({ where: { username } });

    // eslint-disable-next-line prettier/prettier
    if(user && (await password===user.password))
    {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
