import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}

/* 
------------- Version larga sin utilizar private -----------------
@Controller()
export class AuthController {
    authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService
    }
} */
