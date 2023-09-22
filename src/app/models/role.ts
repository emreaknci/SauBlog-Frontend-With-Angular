import { BaseEntity } from "./baseModels/baseEntity";
import { Category } from "./category";
import { Writer } from "./writer";
import { Comment } from 'src/app/models/comment';
import { User } from "./baseModels/user";

export interface Role extends BaseEntity{
    users?:User[];
    name?:string;
}