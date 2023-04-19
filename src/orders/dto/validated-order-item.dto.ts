import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class ValidatedOrderItem {
    @ApiProperty({ type: String, name: 'name', default: "Item name" })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ type: Number, name: 'quantity', default: 3 })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number

    @ApiProperty({ type: Number, name: 'price', default: 20 })
    @IsNotEmpty()
    @IsNumber()
    price: number
}
