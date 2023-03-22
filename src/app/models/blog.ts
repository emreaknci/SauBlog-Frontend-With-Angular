import { BaseEntity } from "./baseModels/baseEntity";
import { Category } from "./category";
import { Writer } from "./writer";
import { Comment } from 'src/app/models/comment';

export interface Blog extends BaseEntity{
    title?:String;
    content?:String;
    imagePath?:String;
    writerId?:String;
    categories?:Category[];
    writer?:Writer;
    comments?:Comment[];
}