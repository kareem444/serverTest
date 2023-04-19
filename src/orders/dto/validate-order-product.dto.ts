import {
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsString,
    ValidateNested,
    IsArray,
    ArrayMinSize,
} from 'class-validator'
import { OrderProduct } from 'src/helpers/types/product.types'
import { Type } from 'class-transformer'
import { ValidatedOrderItem } from './validated-order-item.dto'
import { ApiProperty } from '@nestjs/swagger'

export class ValidatedOrderProduct implements OrderProduct {
    @ApiProperty({
        type: String,
        default: '643fcb037a8263a9e0976225',
        name: 'id',
    })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({ type: String, default: 'Product name', name: 'name' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({
        type: String,
        default:
            'https://iti-kareem-test.s3.amazonaws.com/product/thumbImage/NaN/1-45959a63-d20d-4d25-b2df-68e1c8debccf.jpg',
        name: 'thumbImage',
        required: false,
    })
    @IsOptional()
    @IsString()
    thumbImage?: string

    @ApiProperty({
        type: [ValidatedOrderItem],
        name: 'items',
    })
    @ValidateNested({ each: true })
    @Type(() => ValidatedOrderItem)
    @IsArray()
    @ArrayMinSize(1)
    items: ValidatedOrderItem[]
}
