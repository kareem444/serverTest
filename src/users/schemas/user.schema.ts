import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserRole } from 'src/helpers/enums/enum.values';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, type: mongoose.Schema.Types.String })
    name: string;

    @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
    email: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    password: string;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    role: UserRole;

    @Prop({ required: false, type: mongoose.Schema.Types.String })
    avatar?: string;

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
