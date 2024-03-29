import { getRecipes, saveRecipes, removeRecipe} from './recipe.js'
import { newIngredient } from './ingredient.js'
import { sortByNumber, newStep, removeHelp } from './steps.js'
import { renderIngredients, renderSteps } from './views.js'

const titleEl = document.querySelector('#recipe-name')
const dietEl = document.querySelector('#diet-type')
const ingredientButton = document.querySelector('#add-ingredient')
const ingredientText = document.querySelector('#new-ingredient')
const returnButton = document.querySelector("#return-home")
const recipeId = location.hash.substring(1)
const deleteModal = document.getElementById('delete-modal')
let recipes = getRecipes()
let recipe = recipes.find((recipe) => recipe.id === recipeId) 
if (!recipe) {
    location.assign('index.html')
}
console.log(recipeId)
let ingredients = recipe.ingredients
const ingredient = ingredients.find((ingredient) => ingredient.id === recipe.ingredients.id)
let steps = recipe.steps

titleEl.value = recipe.name
dietEl.value = recipe.diet

renderIngredients(ingredients)
renderSteps(steps)

// Event handler for return button
returnButton.addEventListener('click', (e) => {
     location.assign('index.html')
})

// Update the recipe name
titleEl.addEventListener('input', (e) => {
    recipe.name = e.target.value
    saveRecipes()

})

// Add recipe diet type based on user selection
dietEl.addEventListener('change', (e) => {
    recipe.diet = e.target.value
    saveRecipes()
})

// Add a new ingredient with button click
ingredientButton.addEventListener('click', (e) => {
    newIngredient(recipe, ingredientText)
})

// Trigger 'new ingredient' button with enter key
ingredientText.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault()
        ingredientButton.click()
    }
})

// Remove help section with 'x' button click
document.querySelector('#help-button').addEventListener('click', (e) => {
    removeHelp()
})
  

// Add a new step
document.querySelector('#add-step').addEventListener('click', (e) => {
    newStep(recipe)
})

// Sort steps by number
document.querySelector("#sort-button").addEventListener('click', (e) => {
        sortByNumber(steps)
        saveRecipes()
        renderSteps(steps)
    
})
// Display delete confirm window
document.querySelector('#delete-button').addEventListener('click', (e) => {
    deleteModal.style.display = "block";
})
// Delete the current recipe
document.querySelector('#confirm-delete').addEventListener('click', (e) => {
    removeRecipe(recipeId)
})
// Close delete confirm window
document.querySelector('#cancel').addEventListener('click', (e) => {
    deleteModal.style.display = "none"
})
// Listen for changes in local storage
window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        recipe = recipes.find((recipe) => recipe.id === recipeId)
    }
    if (!recipe) {
    location.assign('index.html')
}
ingredients = recipe.ingredients
        steps = recipe.steps

renderIngredients(ingredients)
renderSteps(steps)

titleEl.value = recipe.name
dietEl.value = recipe.diet
})