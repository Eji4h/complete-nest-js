import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { LoginUseCase } from '../../applications/usercases/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const accessToken = await this.loginUseCase.execute(loginDto);
    return {
      accessToken,
    };
  }
}
