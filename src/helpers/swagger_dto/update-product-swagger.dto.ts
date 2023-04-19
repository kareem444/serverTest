import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { CreateItemDto } from 'src/items/dto/create-item.dto';

export class UpdateProductSwaggerDto {
    @ApiProperty({ type: String, format: 'binary', required: false })
    file: Express.Multer.File;

    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(50)
    @ApiProperty({
        type: String,
        default: 'Default title to the products',
        name: 'title',
        required: false
    })
    title: string

    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(400)
    @ApiProperty({
        type: String,
        default: `Default description to the productsLorem ipsum dolor sit amet, consectetur dolor sint, sed do exercitation nisi ex ut labore et sint magna minim. Ut enim ad minim veniam, quis nostrud exercitation.`,
        name: 'description',
        required: false
    })
    description: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        default: 'Cairo',
        name: 'location',
        required: false
    })
    location: string

    @IsOptional()
    @IsArray()
    @ApiPropertyOptional({
        type: [Date],
        name: 'notAvailableDates',
        example: ['2022-05-01', '2022-05-02'],
        default: '2022-05-01',
        description: 'An array of dates when the object is not available',
        required: false
    })
    notAvailableDAtes: Date[]
}
