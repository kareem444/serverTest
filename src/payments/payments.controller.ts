import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard';
import { Auth } from 'src/helpers/decorators/auth.decorator';
import { AuthType } from 'src/helpers/types/auth.type';
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/users/auth/role/roles.decorator';
import { UserRole } from 'src/helpers/enums/enum.values';
import { RoleGuard } from 'src/users/auth/role/role.guard';
import { StripePaymentDto } from './dto/stripe-payment.dto';

@ApiTags("payment")
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @UseGuards(JwtAuthGuard)
  @Post('create/:orderId')
  create(
    @Auth() auth: AuthType,
    @Param('orderId') orderId: string,
  ) {
    return this.paymentsService.create(auth, orderId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'Create stripe intent client secrete',
    type: StripePaymentDto,
  })
  @Post('intentStripe')
  intentStripe(
    @Body() stripePaymentDto: StripePaymentDto,
  ) {
    return this.paymentsService.intentStripe(stripePaymentDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("my_Payments")
  findUserPayments(
    @Auth() auth: AuthType,
  ) {
    return this.paymentsService.findUserPayments(auth);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }
}
