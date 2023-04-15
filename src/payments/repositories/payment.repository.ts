import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from '../schemas/payment.schema';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/helpers/db/entity.repository';


@Injectable()
export class PaymentRepository extends EntityRepository<PaymentDocument> {
    constructor(
        @InjectModel(Payment.name)
        paymentModel: Model<PaymentDocument>
    ) {
        super(paymentModel);
    }
}
