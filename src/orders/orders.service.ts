import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repositories/order.repository';
import { Order } from './schemas/order.schema';
import { AuthType } from 'src/helpers/types/auth.type';
import { UserRole } from 'src/helpers/enums/enum.values';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) { }

  async create(auth: AuthType, createOrderDto: CreateOrderDto) {
    createOrderDto.ownerId = auth.userId
    try {
      createOrderDto.price = 0
      createOrderDto.product.items.forEach(e => {
        createOrderDto.price += e.price
      })
      return await this.orderRepository.create(createOrderDto)
    } catch (error) {
      throw new InternalServerErrorException("Error creating order. Please try again later.");
    }
  }

  async findAll() {
    try {
      return await this.orderRepository.findAll()
    }
    catch (error) {
      throw new InternalServerErrorException("Error fetching orders. Please try again later.");
    }
  }

  async findUserOrders(auth: AuthType,) {
    try {
      return await this.orderRepository.findAll({ ownerId: auth.userId })
    }
    catch (error) {
      throw new InternalServerErrorException("Error fetching orders. Please try again later.");
    }
  }

  async requestsOrders(auth: AuthType,) {
    try {
      return await this.orderRepository.findAll({ sellerId: auth.userId })
    }
    catch (error) {
      throw new InternalServerErrorException("Error fetching orders. Please try again later.");
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      return await this.orderRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(auth: AuthType, id: string, updateOrderDto: UpdateOrderDto) {
    await this.checkIfCanAccessOrder(auth, id)

    try {
      updateOrderDto.price = 0
      updateOrderDto.product.items.forEach(e => {
        updateOrderDto.price += e.price
      })
      return await this.orderRepository.findOneAndUpdate({ _id: id }, updateOrderDto)
    }
    catch (error) {
      throw new InternalServerErrorException("Error updating order. Please try again later.");
    }
  }

  async remove(auth: AuthType, id: string) {
    await this.checkIfCanAccessOrder(auth, id)

    try {
      return await this.orderRepository.deleteOne({ _id: id })
    }
    catch (error) {
      throw new InternalServerErrorException("Error deleting order. Please try again later.");
    }
  }

  async checkIfCanAccessOrder(auth: AuthType, id: string,): Promise<Order> {
    const order: Order = await this.findOne(id)

    if (!order) {
      throw new NotFoundException()
    }

    if (order.ownerId !== auth.userId || auth.role !== UserRole.ADMIN) {
      throw new ForbiddenException()
    }
    else {
      return order
    }
  }

}
