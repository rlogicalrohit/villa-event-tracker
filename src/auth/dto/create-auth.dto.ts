import { IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";

export class CreateAuthDto {

    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    password: string;
}
