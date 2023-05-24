import uuidv4 from 'uuid/v4.js'
import { renderIngredients } from './views.js'

// Add a new ingredient with button click
const newIngredient = (recipe, ingredientText) => {
    const id = uuidv4()
    if (ingredientText.value.length > 0) {
        recipe.ingredients.push({
            id,
            name: ingredientText.value,
            amount: '',
            possess: false
        })
        renderIngredients(recipe.ingredients)
        ingredientText.value = '';
    }
}

// Toggle ingredient possession
const toggleIngredient = (id, ingredients) => {
    const ingredient = ingredients.find((ingredient) => ingredient.id === id)
    if (ingredient) {
        ingredient.possess = !ingredient.possess
    }
}

// Remove ingredient from ingredients list
const removeIngredient = (id, ingredients) => {
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.id === id)

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
    }
}

export { newIngredient, toggleIngredient, removeIngredient }