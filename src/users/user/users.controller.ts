import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth } from 'src/helpers/decorators/auth.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Uploaded } from 'src/helpers/decorators/uploaded.decorator'
import CustomUploadFile from 'src/helpers/files/custom_upload_file.multer'
import { EnumFileType, EnumUploadedOptions, UserRole } from 'src/helpers/enums/enum.values'
import { Roles } from '../auth/role/roles.decorator'
import { RoleGuard } from '../auth/role/role.guard'
import { AuthType } from 'src/helpers/types/auth.type'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Auth('userId') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CustomUploadFile({ type: EnumFileType.IMAGE, path: "users/avatar" }))
  update(
    @Auth() auth: AuthType,
    @Body() updateUserDto: UpdateUserDto,
    @Uploaded({
      option: EnumUploadedOptions.FULL_PATH,
    })
    filePath?: string,
  ) {
    if (filePath) {
      updateUserDto.avatar = filePath
    }
    return this.usersService.update(auth.userId, updateUserDto)
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}
