import { Get, Post } from '@nestjs/common';
import { Param, Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { AppUser } from './users.entity';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Get('/:id')
    getUserByID(@Param('id') id: string): Promise<AppUser> {
        return this.authService.getUserByID(id)
    }

    @Post('/signup')
    createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto)
    }
}
