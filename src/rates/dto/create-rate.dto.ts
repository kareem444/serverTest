import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class CreateRateDto {
    @ApiProperty({ type: Number, default: 3, name: "rate" })
    @IsNumber()
    @Min(1)
    @Max(5)
    rate: number

    updatedAt: Date = new Date()
}
