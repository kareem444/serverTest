import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PaymentRepository } from './repositories/payment.repository'
import { AuthType } from 'src/helpers/types/auth.type'
import { OrdersService } from 'src/orders/orders.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { Order } from 'src/orders/schemas/order.schema'
import { Payment } from './schemas/payment.schema'

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly ordersService: OrdersService,
  ) { }

  async create(user: AuthType, orderId: string): Promise<void> {
    const order: Order = await this.ordersService.findOne(orderId)

    if (!order) {
      throw new NotFoundException('Order not found')
    }

    const createPaymentDto = new CreatePaymentDto()
    createPaymentDto.user = user
    createPaymentDto.order = order;

    try {
      await this.paymentRepository.create(createPaymentDto)
    } catch (error) {
      throw new InternalServerErrorException("Error while creating payment")
    }
  }

  async findAll(): Promise<Payment[]> {
    try {
      return await this.paymentRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<Payment> {
    try {
      return await this.paymentRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
