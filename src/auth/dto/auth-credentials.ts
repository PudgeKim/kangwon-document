import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"


export class SignUpDto {

    @IsEmail()
    email: string

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    nickname: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: '영대문자, 영소문자, 특수문자가 포함되어야 합니다.'
    })
    password: string
}

export class SignInDto {

    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string
    
}