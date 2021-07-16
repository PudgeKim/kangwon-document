import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { AppUser } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ){}

    async getUserByID(id: string): Promise<AppUser> {
        const user = await this.usersRepository.findOne(id)

        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`)
        }

        return user
    }

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
       return this.usersRepository.createUser(authCredentialsDto)
    }
}

