import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateCommentDto } from './create-comment-dto';

@Controller('comments')
export class CommentsController {
    constructor( private readonly commentsService: CommentsService) {}

}
