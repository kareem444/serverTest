import {
    Body,
    Controller,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { Auth } from 'src/helpers/decorators/auth.decorator'
import { AuthType } from 'src/helpers/types/auth.type'
import { CreateCommentDto } from './dto/create-comment.dto'
import { JwtAuthGuard } from 'src/users/auth/guards/jwt-auth.guard'
import { ApiBody, ApiTags } from '@nestjs/swagger'

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
}
