import { ApiProperty } from '@nestjs/swagger';
import { double } from 'aws-sdk/clients/lightsail';
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
    amount: double;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, default: "usd", name: 'currency', required: false })
    currency?: string
}
