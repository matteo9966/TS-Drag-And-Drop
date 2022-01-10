import { BaseComponent } from "./base-component";
import { Column } from "../models/Column";
import { stateInstance } from "../state/global-state";
import { ItemComponent } from "./item-component";
import { titleValidator } from "../helperFunctions/Validation/titleValidation";
export class ColumnComponent extends BaseComponent<
  HTMLDivElement,
  HTMLDivElement
> {
  private column: Column;
  private columnItemsContainer:HTMLDivElement;
  private formElement:HTMLFormElement;

  private columnContainerID:string;
  constructor(column: Column,hostID:string) {
    super("column", hostID, column.ItemID);
    this.columnItemsContainer=this.element.querySelector('.column-body')!
    this.formElement=this.element.querySelector('form')!;
    this.column = column;
    this.columnContainerID=this.elementID+'-container'
    // this.renderItems();
    this.configure();
    this.renderContent();

    //devo fare il render degli items.
  }

  configure() {
   
    this.columnItemsContainer.id=this.columnContainerID;
    this.configureForm();
    // console.log("aggiunto il listener per colonna")
   this.column.listenerIndex= stateInstance.addListener(() => { //#FIXME: questo non va bene!
      this.renderItems();
      
    });
    this.configureDroppableArea();
  }
  renderContent(): void {
    const title = this.element.querySelector("#column-title");
    title!.innerHTML = this.column.name;
    this.renderItems();
    
    
  }

  private renderItems() {
      
    const items = stateInstance.filterItems(this.column.ItemID) /* filterItems(stateInstance.state, this.column.ItemID); */
    // console.log(items,this.columnContainerID)
    this.columnItemsContainer.innerHTML="";
    items.forEach((item) => {
      // console.log('item presente nella colonna: ',item)
      new ItemComponent(item, this.columnContainerID);
    });
  }
  
  private formSubmitHandler(e:SubmitEvent){
    e.preventDefault();
    const title=(this.formElement.querySelector('#form-title-input') as HTMLInputElement)!.value;
    const description =(this.formElement.querySelector('#form-description-input') as HTMLTextAreaElement)!.value;
    if(titleValidator(title)){
        stateInstance.addItem(title,this.column.ItemID,description);
        // console.log(this.columnContainerID,title);
    }
    
  }

  onDragOver(event:DragEvent){
      event.preventDefault();
  }

  onDropItem(event:DragEvent){
    const id = event.dataTransfer!.getData('text');
    if(id && this.elementID){
      stateInstance.moveItem(this.elementID,id)
    }

  
    //ora che  ho id del elemento che voglio droppare posso fare il rerender,

  }
   
  private configureForm(){
    this.formElement.addEventListener('submit',this.formSubmitHandler.bind(this))
  }
  private configureDroppableArea(){
    this.columnItemsContainer.addEventListener('dragover',this.onDragOver)
    this.columnItemsContainer.addEventListener('drop',this.onDropItem.bind(this));
  }
}
