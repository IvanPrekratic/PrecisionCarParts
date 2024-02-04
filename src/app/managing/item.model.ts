export class Item {
    name: string = '';
    carMake: string = '';
    carModel: string = '';
    description: string = '';
    brand: string = '';
    oe_number: string = '';
    price: number =  0;
    stock: number = 0;
    image: string = '';
    category: string = '';
    itemID: string = '';
    constructor(name: string, carMake: string, carModel: string, description: string, brand: string, oe_number: string, price:number, stock: number, image:string, category: string, itemID: string){
        this.name = name;
        this.carMake = carMake;
        this.carModel = carModel;
        this.description = description;
        this.brand = brand;
        this.oe_number = oe_number;
        this.price = price;
        this.image = image;
        this.stock = stock;
        this.category = category;
        this.itemID = itemID;
    }
}