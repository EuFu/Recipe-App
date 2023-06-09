import uuidv4 from 'uuid/v4.js'

let recipes = []

const recipeId = location.hash.substring(1)
console.log(recipes.find((recipe) => recipe.id === recipeId))


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
        location.assign('index.html')
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

recipes = loadRecipes()

export { saveRecipes, getRecipes, createRecipe, removeRecipe, getIngredients, getSteps }