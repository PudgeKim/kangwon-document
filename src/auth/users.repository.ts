import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import {EntityRepository, Repository} from 'typeorm'
import { SignUpDto } from './dto/auth-credentials';
import { AppUser } from './users.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(AppUser)
export class UsersRepository extends Repository<AppUser> {

    async createUser(signUpDto: SignUpDto): Promise<void> {
        const now = new Date().toLocaleString()
        const {email, nickname, password} = signUpDto
        
        const salt = await bcrypt.genSalt()
        const hashedPW = await bcrypt.hash(password, salt)
        
        const user = this.create({
            email: email,
            nickname: nickname,
            password: hashedPW,
            createdAt: now
        })

        try {
            await this.save(user)
        } catch(error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists')
        } else {
            throw new InternalServerErrorException()
            }
        }
    }
}
