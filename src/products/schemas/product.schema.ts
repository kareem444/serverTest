import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    title: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    description: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    thumbImage: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    location: string;

    @Prop({ required: true, type: mongoose.Schema.Types.Array })
    comments: string;

    @Prop({ required: true, type: mongoose.Schema.Types.Array })
    notAvailableDAtes: Date[];

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    ownerId: string;

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
