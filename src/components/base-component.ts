export abstract class BaseComponent<H extends HTMLElement,E extends HTMLElement>{ //H is the host element (the parent,E is the element)
    public template:HTMLTemplateElement;
    public host:H;
    public element!: E;
    public templateID:string;
    public hostID:string;
    public elementID?:string;

    
    constructor(templateID:string,hostID:string,elementID?:string){ //if i dont' pass a elementID the elment altready exists!
        this.templateID=templateID;
        this.hostID=hostID;
        this.elementID=elementID;
        this.host = document.querySelector(this.hostID)! as H;
        this.template = document.querySelector(this.templateID)! as HTMLTemplateElement;
        
        this.create();
        this.attach();

    }
     
    create(){ //this method creates an element from template 
      const clonedNode = this.template.content.firstElementChild!.cloneNode(true) as E;
      this.element=clonedNode;
      if(this.elementID){
          this.element.id=this.elementID;
      }

    }
    //per adesso creo solo un elemento e lo appendo alla fine del contenitore!
    attach(){ //this method attaches element to the host element
      this.host.insertAdjacentElement('beforeend',this.element);   
    }




}