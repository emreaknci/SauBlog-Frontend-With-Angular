import { BaseEntity } from "./baseModels/baseEntity";

export interface Writer extends BaseEntity{
    userId?:String;
    nickName?:String;
}