import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CommentUser } from "src/helpers/types/comment.type";

export class CreateCommentDto {
    user: CommentUser

    @ApiProperty({ type: String, default: "First message", name: "comment" })
    @IsString()
    @IsNotEmpty()
    comment: string
}
