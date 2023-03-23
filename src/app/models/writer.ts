import { BaseEntity } from "./baseModels/baseEntity";
import { User } from "./baseModels/user";
import { Blog } from "./blog";
import { Comment } from "./comment";

export interface Writer extends BaseEntity{
    userId?:String;
    nickName?:String;
    blogs?:Blog[];
    comments?:Comment[];
    user?:User;
}