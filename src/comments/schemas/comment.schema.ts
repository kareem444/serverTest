import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { CommentUser } from 'src/helpers/types/comment.type';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({ required: true, type: mongoose.Schema.Types.Map })
    user: CommentUser;

    @Prop({ required: true, type: mongoose.Schema.Types.String })
    comment: string;

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
