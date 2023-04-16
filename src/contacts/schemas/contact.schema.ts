import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    name: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    email: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    phone?: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    message: string;

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
