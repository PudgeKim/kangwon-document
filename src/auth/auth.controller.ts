import { Get, Post, Req, UseGuards } from '@nestjs/common';
import { Param, Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth-credentials';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<UserWithToken> {
    return this.authService.signIn(signInDto);
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  getTest(@Req() req) {
    console.log(req);
  }

  @Get('/:id')
  getUserByID(@Param('id') id: string): Promise<PublicAppUser> {
    return this.authService.getUserByID(id);
  }
}
