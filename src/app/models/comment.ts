import { BaseEntity } from "./baseModels/baseEntity";
import { Blog } from "./blog";
import { Writer } from "./writer";

export interface Comment extends BaseEntity{
    content:String;
    writer?:Writer;
    writerId:number;
    blog?:Blog;
    blogId:number;
}