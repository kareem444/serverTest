import { Module } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { PaymentsController } from './payments.controller'
import { PaymentRepository } from './repositories/payment.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Payment, PaymentSchema } from './schemas/payment.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentRepository],
})
export class PaymentsModule {}
