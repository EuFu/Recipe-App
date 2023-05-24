import uuidv4 from 'uuid/v4.js'
import  { renderIngredients, renderSteps } from './views.js'

let recipes = []

const recipeId = location.hash.substring(1)
console.log(recipes.find((recipe) => recipe.id === recipeId))
// let selectedRecipe = recipes.find((recipe) => recipe.id === recipeId) 
// if (selectedRecipe === undefined) {
//     window.location.assign('index.html')
// }
// console.log(selectedRecipe.ingredients)
// let ingredients = selectedRecipe.ingredients
// const ingredient = ingredients.find((ingredient) => ingredient.id === selectedRecipe.ingredients.id)
// let steps = selectedRecipe.steps


// Read recipes from local storage
const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

// Save recipes to local storage
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Expose recipes from module
const getRecipes = () => recipes

// Create a new recipe
const createRecipe = () => {
    const id = uuidv4()
    recipes.push({
        id,
        name: '',
        diet: '',
        ingredients: [],
        steps: []
    })
    saveRecipes()
    return id
}

// Remove a recipe
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

const getIngredients = () => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    return recipe.ingredients
}

const getSteps = () => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    return recipe.steps
}

// // Add a new ingredient with button click
// const newIngredient = (recipe, ingredientText) => {
//     const id = uuidv4()
//     if (ingredientText.value.length > 0) {
//         recipe.ingredients.push({
//             id,
//             name: ingredientText.value,
//             amount: '',
//             possess: false
//         })
//         // // renderIngredients(ingredients)
//         // ingredientText.value = '';
//     }
// }

// // Toggle ingredient possession
// const toggleIngredient = (id) => {
//     const ingredient = ingredients.find((ingredient) => ingredient.id === id)
//     if (ingredient) {
//         ingredient.possess = !ingredient.possess
//     }
// }

// // Remove ingredient from ingredients list
// const removeIngredient = (id) => {
//     const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.id === id)

//     if (ingredientIndex > -1) {
//         ingredients.splice(ingredientIndex, 1)
//     }
// }

// // Remove help section with 'x' button click
// const removeHelp = () => {
//     const helpButton = document.querySelector('#help-button')
//     const helpEl = document.querySelector('#help-area')
//     if (helpButton.textContent ==="?") {
//         const helpText = document.createElement('p')

//         helpButton.textContent = "X";
//         helpText.textContent = 'Forgot a step?\nClick and change a step number to the desired number, then click "Sort Order"'
//         helpEl.appendChild(helpText)
//     } else {
//         helpButton.textContent = '?'
//         helpEl.innerHTML = ''
//     }
//     renderSteps(steps)
// }

// // Add a new step
// const newStep = () => {
//     const directions = document.querySelector('#step-text')
//     const id = uuidv4()
//     if (directions.textContent.length > 0) {
//         selectedRecipe.steps.push({
//             id,
//             completed: false, 
//             number: stepNumber(steps),
//             text: `-   ${directions.textContent}`
//         })
//     }
//     directions.innerHTML = ''
//     saveRecipes()
//     renderSteps(steps)
// }

// // Remove a step from steps list
// const removeStep = (id) => {
//     const stepIndex = steps.findIndex((step) => step.id === id)

//     if (stepIndex > -1) {
//         steps.splice(stepIndex, 1)
//     }
// }

// // Toggle step completed property
// const toggleStep = (id) => {
//     const step = steps.find((step) => step.id === id)
    
//     if (step) {
//         step.completed = !step.completed
//     }
// }

// // Determine step number
// const stepNumber = (steps) => {
//     if (steps.length > 0) {
//         const numbersArray = []
//         steps.forEach((step) => numbersArray.push(step.number))
//         return Math.max(...numbersArray) + 1
//     } else { 
//         return 1
//     }
    
// }

// // Sort Steps by number
// const sortByNumber = (steps) => {
//     const lastNumber = steps[steps.length - 1].number
//     const duplicateNumber = steps.length !== new Set(steps.number).size
//     if (steps.length !== lastNumber || duplicateNumber) {
//         steps.forEach((step) => step.number = steps.indexOf(step) + 1)
//     }
//     steps.sort((a, b) => {
//         if (parseInt(a.number) < parseInt(b.number)) {
//             return -1
//         } else if (parseInt(a.number) > parseInt(b.number)) {
//             return 1
//         } else {
//             return 0
//         }
//     })
// }

// // Check if step number already exists
// const sameStepNum = (num, oldNum) => {
//     const duplicateStep = steps.length !== new Set(steps.number).size

//     if (duplicateStep) {
//         const spot = steps.splice(oldNum-1, 1)
//         steps.splice(num-1, 0, ...spot)
//         }
// }

recipes = loadRecipes()

export { saveRecipes, getRecipes, createRecipe, removeRecipe, getIngredients, getSteps }