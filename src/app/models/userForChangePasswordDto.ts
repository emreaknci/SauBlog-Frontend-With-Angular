export interface UserForChangePasswordDto{
    userId:number;
    oldPassword?:string;
    newPassword?:string;
}