import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateRateDto } from './dto/create-rate.dto'
import { ProductRepository } from 'src/products/repositories/product.repository'
import { AuthType } from 'src/helpers/types/auth.type'
import { Product } from 'src/products/schemas/product.schema'
import { Rate } from './schemas/rate.schema'
import { RateUser } from 'src/helpers/types/rate.type'

@Injectable()
export class RatesService {
  constructor(private readonly productRepository: ProductRepository) { }

  async create(
    auth: AuthType,
    productId: string,
    createRateDto: CreateRateDto,
  ) {
    const product: Product = await this.productRepository.findOneById(productId)

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    const user: RateUser = product.rates.users.find(e => e.id == auth.userId)

    const rates: Rate = product.rates

    if (user) {
      rates.totalRates -= user.rate
      rates.totalRates += createRateDto.rate

      rates.users = rates.users.map(e =>
        e.id == auth.userId ? { id: auth.userId, rate: createRateDto.rate } : e,
      )
    } else {
      rates.numberOfRates++
      rates.totalRates += createRateDto.rate
      rates.users.push({ id: auth.userId, rate: createRateDto.rate })
    }

    return await this.productRepository.updateOne({ _id: productId }, {
      rates: rates,
    })
  }
}
