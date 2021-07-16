import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"


export class AuthCredentialsDto {

    @IsEmail()
    email: string

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    nickname: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/, {
        message: 'password is too weak'
    })
    password: string
}