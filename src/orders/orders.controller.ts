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
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { UpdateOrderSwaggerDto } from 'src/helpers/swagger_dto/update-order-swagger.dto'
import { Roles } from 'src/users/auth/role/roles.decorator'
import { UserRole } from 'src/helpers/enums/enum.values'
import { RoleGuard } from 'src/users/auth/role/role.guard'

@ApiTags("orders")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    description: 'Create new order',
    type: CreateOrderDto,
  })
  create(@Auth() auth: AuthType, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(auth, createOrderDto)
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':orderId')
  finOne(
    @Auth() auth: AuthType,
    @Param('orderId') orderId: string
  ) {
    return this.ordersService.findOne(auth, orderId)
  }

  @UseGuards(JwtAuthGuard)
  @Get("myOrders")
  findUserOrders(@Auth() auth: AuthType) {
    return this.ordersService.findUserOrders(auth)
  }

  @UseGuards(JwtAuthGuard)
  @Get("requestsOrders")
  requestsOrders(@Auth() auth: AuthType) {
    return this.ordersService.requestsOrders(auth)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'Update order',
    type: UpdateOrderSwaggerDto,
  })
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
