import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { AuthType } from 'src/helpers/types/auth.type';
import { OrderSchema, Order } from 'src/orders/schemas/order.schema';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    user: AuthType;

    @Prop({ required: true, type: OrderSchema })
    order: Order;

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
