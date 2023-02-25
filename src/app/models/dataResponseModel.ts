import { ResponseModel } from "./responseModel";

export default interface DataReponseModel<T> extends ResponseModel{
    data:any;
}