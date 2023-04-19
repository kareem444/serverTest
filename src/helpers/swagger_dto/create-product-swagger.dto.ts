import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateProductSwaggerDto extends CreateProductDto {
    @ApiProperty({ type: String, format: 'binary', required: true })
    file: Express.Multer.File;
}
