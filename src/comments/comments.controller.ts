import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { Auth } from 'src/helpers/decorators/auth.decorator'
import { AuthType } from 'src/helpers/types/auth.type'
import { CreateCommentDto } from './dto/create-comment.dto'
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/users/auth/role/roles.decorator'
import { UserRole } from 'src/helpers/enums/enum.values'
import { RoleGuard } from 'src/users/auth/role/role.guard'

@ApiTags("comments")
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) { }

    @ApiBody({
        description: 'Create new comment',
        type: CreateCommentDto,
    })
    @UseGuards(JwtAuthGuard)
    @Post(':productId')
    create(
        @Auth() auth: AuthType,
        @Param('productId') productId: string,
        @Body() createCommentDto: CreateCommentDto,
    ) {
        return this.commentService.create(auth, productId, createCommentDto)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':productId?commentId')
    delete(
        @Param('productId') productId: string,
        @Query("commentId") commentId: string,
    ) {
        return this.commentService.delete(productId, commentId)
    }
}
