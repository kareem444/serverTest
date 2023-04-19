import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard';
import { Auth } from 'src/helpers/decorators/auth.decorator';
import { AuthType } from 'src/helpers/types/auth.type';
import { ApiTags } from '@nestjs/swagger'

@ApiTags("payment")
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':orderId')
  create(
    @Auth() auth: AuthType,
    @Param('orderId') orderId: string,
  ) {
    return this.paymentsService.create(auth, orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }
}
