import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repositories/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { CommentsModule } from 'src/comments/comments.module';
import { RatesModule } from 'src/rates/rates.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CommentsModule,
    RatesModule,
    ItemsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository]
})
export class ProductsModule { }
