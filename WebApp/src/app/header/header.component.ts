import { Component } from '@angular/core';
import { DatastorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dataStorsgeService: DatastorageService) {

  }

  onSaveHeaderData() {
    this.dataStorsgeService.storeRecipes();
  }
  onfetchData() {
    this.dataStorsgeService.FetchRecipeData();
  }


}

