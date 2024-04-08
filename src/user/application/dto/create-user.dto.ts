import { IsDate, IsEmail, IsIn, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    lastName: string;    

    @IsString()
    @MinLength(1)
    @IsEmail()
    email: string;

    @IsDate()
    birthDate: string;

    @IsString()
    @IsIn(['M','F'])
    gender: string;

}