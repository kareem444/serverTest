import { IsNotEmpty, IsOptional, IsNumber, IsString, ValidateNested } from 'class-validator';
import { OrderProduct } from 'src/helpers/types/product.types';
import { Type } from 'class-transformer'
import { ValidatedOrderItem } from './validated-order-item.dto';

export class ValidatedOrderProduct implements OrderProduct {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    thumbImage?: string;

    @ValidateNested({ each: true })
    @Type(() => ValidatedOrderItem)
    items: ValidatedOrderItem[];
}
