import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductRepository } from './repositories/product.repository'
import { AuthType } from 'src/helpers/types/auth.type'
import { Product } from './schemas/product.schema'
import { UserRole } from 'src/helpers/enums/enum.values'

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) { }

  async create(auth: AuthType, createProductDto: CreateProductDto) {
    createProductDto.ownerId = auth.userId
    try {
      return await this.productRepository.create(createProductDto)
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while trying to create new product',
      )
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.findAll()
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while trying to find all products',
      )
    }
  }

  async findMyProducts(auth: AuthType): Promise<Product[]> {
    try {
      return await this.productRepository.findAll({ ownerId: auth.userId })
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while trying to find all products',
      )
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      return await this.productRepository.findOneById(id)
    } catch (error) {
      throw new NotFoundException('This product is not exist')
    }
  }

  async update(auth: AuthType, id: string, updateProductDto: UpdateProductDto) {
    await this.checkIfCanAccessProduct(auth, id)

    try {
      return await this.productRepository.updateOne(
        { _id: id },
        updateProductDto,
      )
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while trying to update this product',
      )
    }
  }

  async remove(auth: AuthType, id: string) {
    await this.checkIfCanAccessProduct(auth, id)

    try {
      return await this.productRepository.deleteOne({ _id: id })
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while trying to remove this product',
      )
    }
  }

  private async checkIfCanAccessProduct(
    auth: AuthType,
    id: string,
  ): Promise<Product> {
    const product: Product = await this.findOne(id)

    if (!product) {
      throw new NotFoundException()
    }

    if (product?.ownerId !== auth.userId || auth.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not allowed to remove this product')
    } else {
      return product
    }
  }
}
