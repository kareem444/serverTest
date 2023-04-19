import { ApiProperty } from '@nestjs/swagger';
import { EnumStatues } from '../enums/enum.values';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ValidatedOrderProduct } from 'src/orders/dto/validate-order-product.dto';

export class UpdateOrderSwaggerDto {
    @ApiProperty({ type: String, default: EnumStatues.COMPLETED, name: "status", required: false })
    @IsOptional()
    @IsEnum(EnumStatues)
    status: EnumStatues

    @ApiProperty({ type: ValidatedOrderProduct, name: "product", required: false })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ValidatedOrderProduct)
    product: ValidatedOrderProduct

    price: number

    ownerId: String
}
