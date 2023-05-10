import {
    IsNotEmpty,
    IsOptional,
    IsEnum,
    ValidateNested,
    IsString,
    IsDate,
    IsDateString
} from 'class-validator';
import { EnumStatues } from 'src/helpers/enums/enum.values';
import { Type } from 'class-transformer'
import { ValidatedOrderProduct } from './validate-order-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ type: String, default: EnumStatues.PENDING, name: "status", required: false })
    @IsOptional()
    @IsEnum(EnumStatues)
    status: EnumStatues

    @ApiProperty({ type: ValidatedOrderProduct, name: "product" })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ValidatedOrderProduct)
    product: ValidatedOrderProduct

    @ApiProperty({ type: String, name: "sellerId", required: true })
    @IsNotEmpty()
    @IsString()
    sellerId: String

    @ApiProperty({ type: Date, name: "date", required: true })
    @IsNotEmpty()
    @IsDateString()
    date: Date

    price: number

    ownerId: String
}
