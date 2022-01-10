import { BaseComponent } from "./base-component";
import {Item} from '../models/Item'
export class ItemComponent extends BaseComponent<HTMLDivElement,HTMLDivElement>{
   private item:Item
   constructor(item:Item,hostId:string,){
       super('item',hostId,item.ItemID)
      
       this.item=item;
       this.renderContent();
   }
   
   onDragStart(event:DragEvent){
       event.dataTransfer?.setData('text/plain',this.item.ItemID)
   }
   
   
    configure(): void {
        throw new Error("Method not implemented.");
    }
    renderContent(): void {

         const item = document.getElementById(this.item.ItemID)!
         item.querySelector("#item-title")!.innerHTML=this.item.name;
         item.querySelector("#item-description")!.innerHTML=this.item.description;
         item.addEventListener('dragstart',this.onDragStart.bind(this))

    }
 


}