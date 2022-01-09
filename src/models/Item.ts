import {BaseItem} from './BaseItem'

export class Item extends BaseItem{
    description: string;
    columnID:string;
    constructor(name:string,description:string,columnID:string){
      super(name)
      this.description=description;
      this.columnID=columnID;
    }
}