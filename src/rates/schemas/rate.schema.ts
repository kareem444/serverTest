import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { RateUser } from 'src/helpers/types/rate.type'

export type RateDocument = Rate & Document

@Schema()
export class Rate {
    @Prop({ required: true, type: mongoose.Schema.Types.Number })
    numberOfRates: number

    @Prop({ required: true, type: mongoose.Schema.Types.Number })
    totalRates: number

    @Prop({ required: true, type: mongoose.Schema.Types.Array })
    users: RateUser[]

    @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
    createdAt: Date
}

export const RateSchema = SchemaFactory.createForClass(Rate)
