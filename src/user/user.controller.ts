import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }
  @Post('/login')
  loginUser(
    @Body() loginUserDto: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.loginUser(loginUserDto);
  }
}
