import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/helpers/db/entity.repository';


@Injectable()
export class ProductRepository extends EntityRepository<ProductDocument> {
    constructor(
        @InjectModel(Product.name)
        productModel: Model<ProductDocument>
    ) {
        super(productModel);
    }
}
