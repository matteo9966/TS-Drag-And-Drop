
import {BaseItem} from './BaseItem'

export class Column extends BaseItem{
    listenerIndex:number
    constructor(name:string){
      super(name)
      this.listenerIndex=-1;
    }
    setListenerIndex(index:number){this.listenerIndex=index}
}