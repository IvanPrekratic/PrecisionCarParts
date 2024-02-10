import { User } from "../user/user.model";
import { CartElement } from "./cart.element";

export class Order {
    cartItems: CartElement[] = [];
    user: User | undefined;
    orderId: string | undefined;
    date: Date | undefined;
    constructor(cartItems: CartElement[], user: User, date: Date) {
        this.cartItems = cartItems;
        this.user = user;
        this.date = date;
    }
}