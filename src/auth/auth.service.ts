import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto, SignInDto } from './dto/auth-credentials';
import { AppUser } from './users.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async getUserByID(id: string): Promise<AppUser> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  signUp(signUpDto: SignUpDto): Promise<void> {
    return this.usersRepository.createUser(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<UserWithToken> {
    const { email, password } = signInDto;
    const user: AppUser = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { nickname: user.nickname };
      const accessToken: string = await this.jwtService.sign(payload);
      return {
        accessToken: accessToken,
        user: {
          id: user.id,
          nickname: user.nickname,
        },
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
