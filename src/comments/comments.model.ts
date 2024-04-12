import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from '@typegoose/typegoose'
export interface CommentsModel extends Base {}

export class CommentsModel extends TimeStamps{
    @prop()
    text:string
    @prop()
    lessonId
}