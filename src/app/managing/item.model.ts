export class Item {
    name: String = '';
    description: String = '';
    brand: String = '';
    oe_number: string = '';
    price: number =  0;
    stock: number = 0;
    image: String = '';
    itemID: String = '';
    constructor(name: String,description: String, brand: String, oe_number: string, price:number, stock: number, image:String, itemID: String){
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.oe_number = oe_number;
        this.price = price;
        this.image = image;
        this.stock = stock;
        this.itemID = itemID;
    }
}