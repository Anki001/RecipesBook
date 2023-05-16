import { Component,OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { shoppingService } from './shoppnglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
ingredients: Ingredient[];


constructor(private slService:shoppingService){

}
ngOnInit() {
  this.ingredients=this.slService.getIngredients();
  this.slService.ingredientChange.subscribe((ingredients:Ingredient[])=>{this.ingredients=ingredients;});
}

onEditItem(index:number){
  this.slService.startedEditing.next(index);
}


}
