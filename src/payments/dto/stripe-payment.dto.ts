import { ApiProperty } from '@nestjs/swagger';

import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class StripePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, default: 20, name: 'amount' })
    amount: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, default: "usd", name: 'currency', required: false })
    currency?: string
}
