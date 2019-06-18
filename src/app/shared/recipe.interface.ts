interface Ingredient {
  amount: number;
  id: string;
  name: string;
}

export interface FirebaseRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
