import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class FreelancerDto {
    @ApiProperty()
    readonly id: number;

    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: 'A valid Email Address Must Be provided', example: "info@mail.com"})
    readonly email: string;

    @ApiProperty()
    readonly phoneNumber: string;

    @MinLength(3)
    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly image: string;

    @ApiPropertyOptional()
    readonly username: string;

    @ApiPropertyOptional()
    readonly skills: string;

    @ApiPropertyOptional()
    readonly degrees: string;

    @ApiPropertyOptional()
    readonly experiences: string;

    @ApiPropertyOptional()
    readonly resumeFile: string;

    @ApiPropertyOptional()
    readonly bidIds: number[];
}
