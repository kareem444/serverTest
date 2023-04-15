import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    userId: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    orderId: string;

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
