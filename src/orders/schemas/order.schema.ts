import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    name: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    userId: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    status: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    price: string;

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
