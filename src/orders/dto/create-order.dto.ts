import {
    IsNotEmpty,
    IsOptional,
    IsEnum,
    ValidateNested
} from 'class-validator';
import { EnumStatues } from 'src/helpers/enums/enum.values';
import { Type } from 'class-transformer'
import { ValidatedOrderProduct } from './validate-order-product.dto';

export class CreateOrderDto {
    @IsOptional()
    @IsEnum(EnumStatues)
    status: EnumStatues

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ValidatedOrderProduct)
    product: ValidatedOrderProduct

    ownerId: String
}
