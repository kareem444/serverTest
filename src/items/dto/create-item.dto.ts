import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    MinLength,
} from 'class-validator'
import { Transform } from 'class-transformer';

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        default: 'Ticket to hawaii',
        name: 'name',
    })
    name: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        type: String,
        default: 'Default description to the item',
        name: 'description',
    })
    description: string

    @Transform((value) => +value.value)
    @IsNumber()
    @Min(1)
    @ApiPropertyOptional({
        type: Number,
        default: 1,
        description: 'The available price for one item'   ,
        name: 'price',
    })
    price: number

    @IsOptional()
    @Transform((value) => +value.value)
    @IsNumber()
    @Min(1)
    @ApiPropertyOptional({
        type: Number,
        default: 1,
        description: 'The available quantity that this item have',
        name: 'quantity',
    })
    quantity: number

    @IsOptional()
    @IsNumber()
    @Transform((value) => +value.value)
    @Min(0)
    @ApiPropertyOptional({
        type: Number,
        default: 0,
        description:
            'The minimum amount of this item that the user should choose to have the product, make it 0 to make this item optional',
        name: 'minQuantity',
    })
    minQuantity: number

    @IsOptional()
    @IsNumber()
    @Transform((value) => +value.value)
    @Min(1)
    @ApiPropertyOptional({
        type: Number,
        default: 1,
        description:
            'The maximum amount of this item that the user can choose, the default is 1',
        name: 'maxQuantity',
    })
    maxQuantity: number
}
