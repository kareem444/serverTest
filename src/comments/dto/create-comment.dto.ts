import { IsNotEmpty, IsString } from "class-validator";
import { CommentUser } from "src/helpers/types/comment.type";

export class CreateCommentDto {
    user: CommentUser

    @IsString()
    @IsNotEmpty()
    comment: string
}
