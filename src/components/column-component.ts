import { BaseComponent } from "./base-component";
import { Column } from "../models/Column";
import { Item } from "../models/Item";
import { statetype } from "../state/global-state";
import { stateInstance } from "../state/global-state";
import { ItemComponent } from "./item-component";
function filterItems(state: statetype, columnID?: string): Item[] {
  if (!columnID) {
    return [];
  }
  const items = state.items.filter((item) => item.columnID === columnID);
  return items;
}

export class ColumnComponent extends BaseComponent<
  HTMLDivElement,
  HTMLDivElement
> {
  private column: Column;
  constructor(column: Column,hostID:string) {
    super("column", hostID, column.ItemID);
    this.column = column;
    this.renderItems();
    this.configure();
    //devo fare il render degli items.
  }

  configure() {
    console.log("configuro la colonna");
    stateInstance.addListener((state) => {
      console.log(state);
    });
  }
  renderContent(): void {
    const title = this.element.querySelector("#column-title");
    title!.innerHTML = this.column.name;
    this.renderItems();
  }

  private renderItems() {
    const items = filterItems(stateInstance.state, this.column.ItemID);

    const title = this.element.querySelector("#column-title");
    title!.innerHTML = this.column.name;
    const columnContainer = this.element.querySelector("#column-body")!;
    columnContainer.innerHTML = "";
    const containerID = this.column.ItemID + "-container";
    columnContainer.id = containerID;
    items.forEach((item) => {
      new ItemComponent(item, containerID);
    });
  }
}
