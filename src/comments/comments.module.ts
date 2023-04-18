import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from 'src/products/schemas/product.schema'
import { ProductRepository } from 'src/products/repositories/product.repository'
import { CommentsController } from './comments.controller'
import { UsersModule } from 'src/users/user/users.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UsersModule,
  ],
  providers: [CommentsService, ProductRepository],
  controllers: [CommentsController],
})
export class CommentsModule { }
