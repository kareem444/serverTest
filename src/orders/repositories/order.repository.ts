import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/helpers/db/entity.repository';


@Injectable()
export class OrderRepository extends EntityRepository<OrderDocument> {
    constructor(
        @InjectModel(Order.name)
        orderModel: Model<OrderDocument>
    ) {
        super(orderModel);
    }
}
