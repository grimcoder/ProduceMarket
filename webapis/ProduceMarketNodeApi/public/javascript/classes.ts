/**
 * Created by taraskovtun on 7/21/15.
 */
module ProduceMarket {
    export class Price {
        Id:number;
        Price:number;
        ItemName:string;

        constructor(id:number, price:number, itemname:string) {
            this.Id = id;
            this.ItemName = itemname;
            this.Price = price
        }
    }

}