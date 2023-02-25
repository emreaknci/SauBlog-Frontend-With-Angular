import { BaseEntity } from "./baseModels/baseEntity";

export interface Blog extends BaseEntity{
    title?:String;
    content?:String;
    imagePath?:String;
    writerId?:String;
}