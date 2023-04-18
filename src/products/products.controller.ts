import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard'
import { RoleGuard } from 'src/users/auth/role/role.guard'
import { Roles } from 'src/users/auth/role/roles.decorator'
import {
  EnumFileType,
  EnumUploadedOptions,
  UserRole,
} from 'src/helpers/enums/enum.values'
import { Auth } from 'src/helpers/decorators/auth.decorator'
import { AuthType } from 'src/helpers/types/auth.type'
import CustomUploadFile from 'src/helpers/files/custom_upload_file.multer'
import { Uploaded } from 'src/helpers/decorators/uploaded.decorator'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Roles(UserRole.ADMIN, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(
    CustomUploadFile({ type: EnumFileType.IMAGE, path: 'product/thumbImage' }),
  )
  @Post()
  create(
    @Auth() auth: AuthType,
    @Body() createProductDto: CreateProductDto,
    @Uploaded({
      option: EnumUploadedOptions.FULL_PATH,
    })
    filePath?: string,
  ) {
    if (filePath) {
      createProductDto.thumbImage = filePath
    }
    return this.productsService.create(auth, createProductDto)
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string) {
    return this.productsService.findOne(productId)
  }

  @Roles(UserRole.ADMIN, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(
    CustomUploadFile({ type: EnumFileType.IMAGE, path: 'product/thumbImage' }),
  )
  @Patch(':productId')
  update(
    @Auth() auth: AuthType,
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @Uploaded({
      option: EnumUploadedOptions.FULL_PATH,
    })
    filePath?: string,
  ) {
    if (filePath) {
      updateProductDto.thumbImage = filePath
    }
    return this.productsService.update(auth, productId, updateProductDto)
  }

  @Roles(UserRole.ADMIN, UserRole.SELLER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':productId')
  remove(@Auth() auth: AuthType, @Param('productId') productId: string) {
    return this.productsService.remove(auth, productId)
  }
}
