import { Component } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';

  constructor(private recipeService: RecipeService){
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
