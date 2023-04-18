import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { Comment, CommentSchema } from 'src/comments/schemas/comment.schema'
import { Item, ItemSchema } from 'src/items/schemas/item.schema'
import { Rate, RateSchema } from 'src/rates/schemas/rate.schema'

export type ProductDocument = Product & Document

@Schema()
export class Product {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    title: string

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    description: string

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    thumbImage: string

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    location: string

    @Prop({ required: false, type: [CommentSchema] })
    comments: Comment[]

    @Prop({
        required: true,
        type: [ItemSchema],
        validate: {
            validator: (value: Item[]) => value.length >= 1,
            message: 'The items should contains at least 1 item',
        },
    })
    items: Item[]

    @Prop({ required: false, type: RateSchema })
    rates: Rate

    @Prop({ required: false, type: mongoose.Schema.Types.Array })
    notAvailableDAtes: Date[]

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    ownerId: string

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)
