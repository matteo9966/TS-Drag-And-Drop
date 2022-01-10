import {Column} from '../models/Column'
import {Item} from '../models/Item';

export type ListenerFunction<H>= (state:H)=>void

export type statetype={
    items:Item[];
    columns:Column[];
}



 class State{
    protected _state!:statetype;
    protected listeners:ListenerFunction<statetype>[] =[]
    /** @returns {number} the index of the listener */
    addListener(listener:ListenerFunction<statetype>){
        
       return (this.listeners.push(listener)-1) ;  //returns the new lenght
    }

    removeListener(index:number){
        if(index>=0) this.listeners.splice(index,1)
    }


    updateListeners(){
        //copiare lo state.state è un oggetto. 
        // console.log(this.listeners);
        if(this._state){

            this.listeners.forEach(listener=>{
                
                listener(this._state)}) //passo lo stato.
        }
    }

    setState(state:statetype){
       this._state=state;
       this.updateListeners();
    }
     
    //deepclone the state!
    cloneState():statetype{
         const clonedstate = JSON.parse(JSON.stringify(this._state)) 
        return clonedstate;
    }

    
}

 class GlobalState extends State{ 
  private static insance:GlobalState;
  private constructor(){
   super();
}

public static getInstance(){
    if(this.insance){
        return this.insance
    }
    this.insance=new GlobalState();
    return  this.insance;
}


addColumn(title:string){
    const column = new Column(title)
    const newState = this.cloneState();

    newState.columns.push(column);
    this.setState(newState)


}

addItem(title:string,columnId:string,description=""){
    const item= new Item(title,description,columnId);
    const newState = this.cloneState();
    newState.items.push(item);
    this.setState(newState);
    // console.log(this._state)
    // console.log("aggiungo un elemento!");
 
}

filterItems( columnID?: string): Item[] {
    if (!columnID) {
      return [];
    }
    const items = this._state.items.filter((item) => item.columnID === columnID);
    return items;
  }


}

export const stateInstance = GlobalState.getInstance();