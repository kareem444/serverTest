import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValidatedOrderItem {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    price: string;
}
