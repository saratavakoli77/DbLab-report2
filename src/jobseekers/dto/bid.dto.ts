import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class BidDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly offeredPrice: number;

    @ApiProperty()
    readonly deadlineToDo: string;

    @ApiProperty()
    readonly prepayment: number;

    @ApiProperty()
    readonly expertiseGuarantee: number;

    @ApiProperty()
    readonly validityDuration: string;

    @ApiProperty()
    readonly descriptionText: string;

    @ApiPropertyOptional()
    readonly descriptionFile: string;

    @ApiProperty()
    readonly freelancerId: number;
}
