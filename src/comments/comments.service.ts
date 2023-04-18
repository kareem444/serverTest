import { Injectable } from '@nestjs/common'
import { InternalServerErrorException } from '@nestjs/common/exceptions'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ProductRepository } from 'src/products/repositories/product.repository'
import { UsersService } from 'src/users/user/users.service'
import { AuthType } from 'src/helpers/types/auth.type'

@Injectable()
export class CommentsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userService: UsersService,
  ) { }

  async create(
    auth: AuthType,
    productId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const user = await this.userService.findOne(auth.userId)

    createCommentDto.user = {
      id: auth.userId,
      ...user
    }

    try {
      await this.productRepository.updateOne({ _id: productId }, {
        $push: {
          comments: createCommentDto
        }
      })
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
