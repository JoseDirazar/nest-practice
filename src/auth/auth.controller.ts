import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {

    return this.authService.signup(dto);
  }

  @Post('signin')
  login(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}

/* 
------------- Version larga sin utilizar privet -----------------
@Controller()
export class AuthController {
    authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService
    }
} */
