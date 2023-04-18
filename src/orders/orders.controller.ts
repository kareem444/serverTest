import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard'
import { Auth } from 'src/helpers/decorators/auth.decorator'
import { AuthType } from 'src/helpers/types/auth.type'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Auth() auth: AuthType, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(auth, createOrderDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Auth() auth: AuthType) {
    return this.ordersService.findAll(auth)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':orderId')
  update(
    @Auth() auth: AuthType,
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(auth, orderId, updateOrderDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':orderId')
  remove(@Auth() auth: AuthType, @Param('orderId') orderId: string) {
    return this.ordersService.remove(auth, orderId)
  }
}
