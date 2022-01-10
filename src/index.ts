import './style-baseline.css'
import './style.css';
import {ContainerComponent} from './components/container-component';
import { stateInstance } from './state/global-state';
import {statetype} from './state/global-state'
import { Column } from './models/Column';
// import {Item} from './models/Item'
import 'bootstrap';
import './scss/app.scss'

const dummyState:statetype={
    columns:[new Column('Column #1'),new Column('Column #2')/* ,new Column('Column #3'),new Column('Column #4'),new Column('Column #5'),new Column('Column #6') */],
    items:[/* new Item('first item','item-1','item 1 desc','001'),new Item('second item','item-2','item 2 desc','002'),new Item('second item','item-3','item 2 desc','002'),new Item('third item','item-4','item 2 description of the second','003') */]
}


new ContainerComponent('container');

stateInstance.setState(dummyState)


