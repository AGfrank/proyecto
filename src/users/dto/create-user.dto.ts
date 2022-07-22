import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Guifrank Azócar' })
    @IsNotEmpty()
    readonly name: string;
  
    @ApiProperty({ example: 'gfrank.azocar@gmail.com' })
    @IsEmail()
    readonly email: string;
  
    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    readonly password: string;
}
