import { BaseComponent } from "./base-component";
import { stateInstance } from "../state/global-state";
import { ColumnComponent } from "./column-component";
import { Column } from "../models/Column";
import {FormComponent} from './form-component';
export class ContainerComponent extends BaseComponent<
  HTMLDivElement,
  HTMLDivElement
> {
  constructor(containerID: string) {
    super("main-container", "app", containerID);
    this.renderContent();
  }

  //a partire dallo stato,quando fa il renderContent, deve prendere gli items, filtrarli e metterci dentro al suo container quelli che gli appartengono
  //deve fare il render dei container che gli appartengono

  configure(): void {
    throw new Error("Method not implemented.");
  }
  renderContent(): void {
    //devo aggiungere il listener al form
    //qui dentro posso fare il render del form???
     this.createForm();
    stateInstance.addListener((state) => {
      this.renderColumns(state.columns);
    });
  }

  createForm(){
    return new FormComponent();
  }

  renderColumns(columns: Column[]) {
    const maincontainer = document.getElementById(this.elementID!);
    const columnsContainer = maincontainer!.querySelector('#columns-container')!

    columnsContainer.innerHTML = "";
    columns.forEach((column) => {
      new ColumnComponent(column,'columns-container');
    });
  }
}
