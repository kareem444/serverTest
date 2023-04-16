import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from 'src/products/repositories/product.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  providers: [RatesService, ProductRepository]
})
export class RatesModule {}
