import { Type } from 'class-transformer'
import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsArray,
    IsOptional,
    ValidateNested,
    ArrayMinSize
} from 'class-validator'
import { CreateItemDto } from 'src/items/dto/create-item.dto'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    title: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(400)
    description: string

    @IsString()
    @IsNotEmpty()
    location: string

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => CreateItemDto)
    items: CreateItemDto[]

    @IsOptional()
    @IsArray()
    notAvailableDAtes: Date[]

    thumbImage: string
    ownerId: string
}
