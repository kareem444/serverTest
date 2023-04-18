import { IsNumber, Min } from "class-validator";

export class CreateRateDto {
    @IsNumber()
    @Min(1)
    @Min(5)
    rate: number

    updatedAt: Date = new Date()
}
