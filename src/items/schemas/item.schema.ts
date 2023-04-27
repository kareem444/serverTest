import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

export type ItemDocument = Item & Document

@Schema()
export class Item {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    name: string

    @Prop({ required: false, type: mongoose.Schema.Types.String })
    description?: string

    @Prop({
        required: false,
        min: 1,
        default: 1,
        type: mongoose.Schema.Types.Number,
    })
    price: number

    @Prop({
        required: false,
        min: 1,
        default: 1,
        type: mongoose.Schema.Types.Number,
    })
    quantity: number

    @Prop({ required: false, min: 0, type: mongoose.Schema.Types.Number })
    minQuantity: number

    @Prop({ required: false, min: 1, type: mongoose.Schema.Types.Number })
    maxQuantity: number
}

export const ItemSchema = SchemaFactory.createForClass(Item)
