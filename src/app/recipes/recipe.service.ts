import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://pinchofyum.com/wp-content/uploads/Lo-Mein-1-2-768x1152.jpg',
            [
                new Ingredient('meat', 1),
                new Ingredient('cheese', 6),
                new Ingredient('bread', 84),
                new Ingredient('carrots', 11)
            ]),
        new Recipe(
            'Another Test Recipe', 
            'This is also a test thank you', 
            'https://www.twopeasandtheirpod.com/wp-content/uploads/2017/03/Thai-Cabbage-Salad-1.jpg',
            [
                new Ingredient('beans', 1),
                new Ingredient('chocolate', 8),
                new Ingredient('french fries', 7),
                new Ingredient('deer', 9)
            ]),
        new Recipe(
            'And Another Test Recipe',
            'ANOTHER TEST BUT IN CAPS', 
            'https://www.thedeliciouscrescent.com/wp-content/uploads/2016/06/Easy-Hyderabadi-Chicken-Biryani-4.jpg',
            [
                new Ingredient('pork', 1),
                new Ingredient('watermelon', 51),
                new Ingredient('gravy', 8),
                new Ingredient('noodles', 81)
            ]),
    ]

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    };
}