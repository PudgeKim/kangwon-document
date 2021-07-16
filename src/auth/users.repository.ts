import {EntityRepository, Repository} from 'typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials';
import { AppUser } from './users.entity';

@EntityRepository(AppUser)
export class UsersRepository extends Repository<AppUser> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const now = new Date().toLocaleString()
         const {email, nickname, password} = authCredentialsDto
         const user = this.create({
            email: email,
            nickname: nickname,
            password: password,
            createdAt: now
        })

        await this.save(user)
    }
}

