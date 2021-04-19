import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ProjectDto {
    @ApiProperty()
    readonly id: number;

    @IsNotEmpty()
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly subject: string;

    @ApiProperty()
    readonly requiredSkills: string;

    @ApiProperty()
    readonly descriptionText: string;

    @ApiPropertyOptional()
    readonly descriptionFile: string;

    @ApiProperty()
    readonly size: number;

    @ApiProperty()
    readonly budget: number;

    @ApiProperty()
    readonly minimumGuarantee: number;

    @ApiProperty()
    readonly deadline: string;

    @ApiProperty()
    readonly type: string;

    @ApiProperty()
    readonly employerId: number;

    @ApiPropertyOptional()
    readonly finalBidId: number;
}
