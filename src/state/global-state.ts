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
    
    addListener(listener:ListenerFunction<statetype>){
        
        this.listeners.push(listener);
    }

    get state():statetype{
        return JSON.parse(JSON.stringify(this._state)) 
    } //ogni volta che accedo allo stato ne prendo una copia
    
    updateListeners(){
        //copiare lo state.state è un oggetto. 
        if(this._state){

            this.listeners.forEach(listener=>{
                
                listener(this._state)}) //passo lo stato.
        }
    }

    setState(state:statetype){
       this._state=state;
       this.updateListeners();
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


addColumn(column:Column){
    this.state.columns.push(column);
    this.setState(this.state) //this.state è una copia dello state non è quello aggiornato
}

}

export const stateInstance = GlobalState.getInstance();