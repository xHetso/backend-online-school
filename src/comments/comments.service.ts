import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './create-comment-dto';

@Injectable()
export class CommentsService {
    constructor(){}

    async addComments( dto: CreateCommentDto){
        
    }
}
