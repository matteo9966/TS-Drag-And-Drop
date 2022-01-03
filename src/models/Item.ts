import {BaseItem} from './BaseItem'

export class Item extends BaseItem{
    description: string;
    columnID:string;
    constructor(name:string,id:string,description:string,columnID:string){
      super(id,name)
      this.description=description;
      this.columnID=columnID;
    }
}