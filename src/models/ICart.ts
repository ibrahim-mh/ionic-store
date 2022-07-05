import { IProduct } from "./IProduct";

export interface ICart{
        id:number,
        userId:number,
        date:Date,
        products:Array<IProduct>
}