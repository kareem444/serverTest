import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { EnumStatues } from 'src/helpers/enums/enum.values'
import { OrderProduct } from 'src/helpers/types/product.types'

export type OrderDocument = Order & Document

@Schema()
export class Order {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    ownerId: string

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    sellerId: string

    @Prop({
        required: false,
        default: EnumStatues.PENDING,
        type: mongoose.Schema.Types.String,
    })
    status: EnumStatues

    @Prop({ required: true, min: 1, type: mongoose.Schema.Types.Map })
    product: OrderProduct

    @Prop({ required: true, type: mongoose.Schema.Types.Number })
    price: number

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
