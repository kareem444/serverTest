import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity: number

    @IsOptional()
    @IsNumber()
    @Min(0)
    minQuantity: number

    @IsOptional()
    @IsNumber()
    @Min(1)
    maxQuantity: number
}
