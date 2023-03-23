import { BaseEntity } from "./baseEntity";

export interface User extends BaseEntity {
    firstName?:string;
    lastName?:string;
    email?:string;
    passwordHash?:string;
    passwordSalt?:string;
}