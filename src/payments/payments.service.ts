import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PaymentRepository } from './repositories/payment.repository'
import { AuthType } from 'src/helpers/types/auth.type'
import { OrdersService } from 'src/orders/orders.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { Order } from 'src/orders/schemas/order.schema'
import { Payment } from './schemas/payment.schema'
import Stripe from 'stripe'
import { StripePaymentDto } from './dto/stripe-payment.dto'

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly ordersService: OrdersService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" })
  }

  async create(user: AuthType, orderId: string): Promise<void> {
    const order: Order = await this.ordersService.findOrder(orderId)

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

  async intentStripe(stripePaymentDto: StripePaymentDto): Promise<string> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: stripePaymentDto.amount * 100,
        currency: stripePaymentDto.currency || "usd",
        payment_method_types: ['card'],
      })
      return paymentIntent.client_secret;
    } catch (error) {
      throw new InternalServerErrorException("Error while creating payment intent");
    }
  }

  async findAll(): Promise<Payment[]> {
    try {
      return await this.paymentRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findUserPayments(
    user: AuthType
  ): Promise<Payment[]> {
    try {
      return await this.paymentRepository.findAll({
        "user.userId": user.userId
      });
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
