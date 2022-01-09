const { v4: uuidV4 } = require('uuid');
export abstract class BaseItem {
    ItemID:string;
    name:string;
    
    constructor(name:string){
        this.ItemID=uuidV4();
        // this.ItemID=ItemID;
        this.name=name;
        
        
    }
}