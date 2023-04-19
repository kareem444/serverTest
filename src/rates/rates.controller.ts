import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Auth } from 'src/helpers/decorators/auth.decorator';
import { RatesService } from './rates.service';
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard';
import { AuthType } from 'src/helpers/types/auth.type';
import { CreateRateDto } from './dto/create-rate.dto';
import {ApiBody, ApiTags} from '@nestjs/swagger'

@ApiTags("rates")
@Controller('rates')
export class RatesController {
    constructor(private readonly rateService: RatesService) { }

    @ApiBody({
        description: 'Add rate to product',
        type: CreateRateDto,
    })
    @UseGuards(JwtAuthGuard)
    @Post(':productId')
    create(
        @Auth() auth: AuthType,
        @Param('productId') productId: string,
        @Body() createRateDto: CreateRateDto,
    ) {
        return this.rateService.create(auth, productId, createRateDto)
    }
}
