import { IsNotEmpty, IsString, MinLength } from "class-validator"
import { Types } from 'mongoose'

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    text: string
    @IsString()
    @IsNotEmpty()
    @MinLength(24)
    lessonId: Types.ObjectId
    @IsString()
    @IsNotEmpty()
    @MinLength(24)
    userId: Types.ObjectId
}