import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { shoppingService } from '../shoppnglist.service';
import { Form, NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;
  ngOnInit() {
    this.subscription =
      this.slService.startedEditing
        .subscribe((index: number) => {
          this.editItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({ name: this.editedItem.name, amount: this.editedItem.amount })
        });
  }

  constructor(private slService: shoppingService) { }

  onSubmit(form: NgForm) {
    debugger;
    const value = form.value;
    const newIngradient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.UpdateIngredient(this.editItemIndex, newIngradient);
    }
    else {
      this.slService.addIngredient(newIngradient)
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.slService.deleteingredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy() { }
}
