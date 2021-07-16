import { IsEmail, IsNotEmpty } from "class-validator"


export class AuthCredentialsDto {

    @IsEmail()
    email: string

    @IsNotEmpty()
    nickname: string

    @IsNotEmpty()
    password: string
}