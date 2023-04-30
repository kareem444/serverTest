import { BadRequestException } from '@nestjs/common'
import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsArray,
    IsOptional,
    ValidateNested,
    ArrayMinSize,
} from 'class-validator'
import { type } from 'os'
import { CreateItemDto } from 'src/items/dto/create-item.dto'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @ApiProperty({
        type: String,
        default: 'Default title to the products',
        name: 'title',
    })
    title: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(400)
    @ApiProperty({
        type: String,
        required: true,
        default: `Default description to the productsLorem ipsum dolor sit amet, consectetur dolor sint, sed do exercitation nisi ex ut labore et sint magna minim. Ut enim ad minim veniam, quis nostrud exercitation.`,
        name: 'description',
    })
    description: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        default: 'Cairo',
        name: 'location',
    })
    location: string

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => CreateItemDto)
    // @Transform((value) => {
    //     try {
    //         if (typeof value.value == 'string') {
    //             let val = JSON.parse(value.value)
    //             if (typeof val == "object") {
    //                 val = [...val]
    //             }
    //             value.obj[value.key] = val
    //         }

    //         return [...value.value]
    //     } catch (error) {
    //         throw new BadRequestException("The item should be array of items")
    //     }
    // })
    @ApiProperty({
        type: [CreateItemDto],
        name: 'items',
        description: 'Each items the the products offers, at least should have one item',
        example: [
            {
                description: 'Default description to the item',
                quantity: 1,
                minQuantity: 0,
                maxQuantity: 1,
            },
            {
                name: 'Ticket to paris',
                description: 'Another ticket to an amazing destination',
                quantity: 2,
                minQuantity: 1,
                maxQuantity: 5,
            },
        ],
    })
    items: CreateItemDto[]

    @IsOptional()
    @IsArray()
    @ApiPropertyOptional({
        type: [Date],
        name: 'notAvailableDates',
        example: ['2022-05-01', '2022-05-02'],
        default: '2022-05-01',
        description: 'An array of dates when the object is not available',
    })
    notAvailableDAtes: Date[]

    thumbImage: string
    ownerId: string
}

