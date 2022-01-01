import {BaseComponent} from './base-component';

export class ColumnComponent extends BaseComponent<HTMLDivElement,HTMLDivElement> {
     
    constructor(columnID:string){
        super('#column','#app',columnID);
    }

}