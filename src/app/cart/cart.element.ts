import { Item } from "../managing/item.model";

export class CartElement {
    item: Item | null;
    quantity: number = 0;
    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }
}