import {BaseComponent} from './base-component'
export class FormComponent extends BaseComponent<HTMLDivElement,HTMLFormElement> {
   
   constructor(){
       super('add-column-template','form-container'); //qui viene chiamato e creato. quando viene chiamato e creato posso configurarlo
       this.configure();
       //queryselector del title
       //svuota dopo aver selezionato il titolo
    }
   
   
    configure(): void {
       //aggiungo un listner al submit
      const form = document.getElementById('add-column-form')! as HTMLFormElement;
      
      form.addEventListener('submit',(e)=>{ e.preventDefault();console.log(e)})
    }
    renderContent(): void {
        throw new Error('Method not implemented.');
    }
    
}