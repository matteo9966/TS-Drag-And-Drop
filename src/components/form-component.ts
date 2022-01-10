import {BaseComponent} from './base-component'
import { stateInstance } from '../state/global-state';
import {titleValidator} from '../helperFunctions/Validation/titleValidation'
export class FormComponent extends BaseComponent<HTMLDivElement,HTMLFormElement> {
   inputTitle:HTMLInputElement
   constructor(){
       super('add-column-template','form-container'); //qui viene chiamato e creato. quando viene chiamato e creato posso configurarlo
       this.configure();
        this.inputTitle = this.element.querySelector('#column-title-id')! as HTMLInputElement

       //queryselector del title
       //svuota dopo aver selezionato il titolo
    }
    
    //bind this!

    submitTitleHandler(e:SubmitEvent){
        e.preventDefault();
        const title = this.inputTitle.value;
        if(titleValidator(title)){
            stateInstance.addColumn(title);
            this.element.reset();
            
        }

    }
   
    configure(): void {
       //aggiungo un listner al submit
      const form = document.getElementById('add-column-form')! as HTMLFormElement;
      
      form.addEventListener('submit',this.submitTitleHandler.bind(this))
    }
    renderContent(): void {
        throw new Error('Method not implemented.');
    }
    
}