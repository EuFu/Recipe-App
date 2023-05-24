import { saveRecipes, getRecipes, getIngredients, getSteps } from './recipe.js'
import { toggleIngredient, removeIngredient } from './ingredient.js'
import { toggleStep, sameStepNum, sortByNumber, removeStep } from './steps.js'
import { getFilters, getDietType } from './filters.js'

// Generate DOM structure for the recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('div')
    const recipeLink = document.createElement('a')
    const titleEl = document.createElement('p')
    const statusEl = document.createElement('p')
    recipeEl.classList.add('recipe')
    recipeLink.classList.add('recipe-link')
    titleEl.classList.add('recipe-name')
    statusEl.classList.add('recipe-status')

    // Setup the recipe title
    if (recipe.name.length > 0) {
        titleEl.textContent = recipe.name
    } else {
        titleEl.textContent = 'Unnamed recipe'
    }
    recipeLink.appendChild(titleEl)

    // Setup the link
    recipeLink.setAttribute('href', `/edit.html#${recipe.id}`)

    // Setup the recipe status
    statusEl.setAttribute('id', 'status-message')
    statusEl.textContent = generateStatusMessage(recipe)
    recipeLink.appendChild(statusEl)

    recipeEl.appendChild(recipeLink)
    return recipeEl
}

// Generate recipe status message
const generateStatusMessage = (recipe) => {
    const status = recipe.ingredients.every((ingredient) => {
       return ingredient.possess
    })
    if (recipe.ingredients.length < 1) {
        return 'You have no ingredients listed'
    } else if (status) {
        return 'You have all the ingredients'
    } else {
        return 'You are missing some ingredients'
    }
}

// Change background image based on diet type
const changeColor = (dietType) => {
    const mainColor = document.querySelector('#index-body')
    const moreThanOne = Object.values(dietType).filter(diet=> diet).length > 1
    if (moreThanOne) {
        mainColor.style.backgroundImage = 'url(https://images.unsplash.com/photo-1569783221530-20e82d1915fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80)';
        mainColor.style.backgroundSize = 'cover'
        mainColor.style.backgroundPosition = 'center top'
    } else if (dietType.meat ) {
        mainColor.style.backgroundImage = 'url(https://images.unsplash.com/photo-1565299524732-d2149c7eabf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1614&q=80)';
        mainColor.style.backgroundPosition = 'center'
        mainColor.style.backgroundSize = 'cover'
    } else if (dietType.pescatarian) {
        mainColor.style.backgroundImage = 'url(https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80)';
        mainColor.style.backgroundPosition = 'center top'
        mainColor.style.backgroundSize = 'cover'
    } else if (dietType.vegetarian) {
        mainColor.style.backgroundImage = 'url(https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1553&q=80)';
        mainColor.style.backgroundPosition = 'center'
        mainColor.style.backgroundSize = 'cover'
    } else if (dietType.vegan) {
        mainColor.style.backgroundImage = 'url(https://images.unsplash.com/photo-1544510807-1c0229035e63?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1544&q=80)';
        mainColor.style.backgroundPosition = 'center top'
        mainColor.style.backgroundSize = 'cover'
    } else {
        mainColor.style.backgroundImage = 'url(https://images.unsplash.com/photo-1531932755987-f95a88affea5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)'
        mainColor.style.backgroundSize = 'cover'
        mainColor.style.backgroundPosition = 'center top'
    }
}

// Render recipes
const renderRecipes = () => {
    const recipes = getRecipes()
    const filters = getFilters()
    const dietType = getDietType()
    const recipesEl = document.querySelector('#recipe-el')
    const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(filters.searchText.toLowerCase()))
    const dietTypeArray = Object.keys(dietType).filter((key) => dietType[key])
    const filteredDietTypes = filteredRecipes.filter((recipe) => dietTypeArray.includes(recipe.diet))

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0 && dietTypeArray.length === 0) {
        filteredRecipes.forEach((recipe) => {
            recipesEl.appendChild(generateRecipeDOM(recipe))
        })
    } else if (filteredRecipes.length > 0 && filteredDietTypes.length > 0) {
        filteredDietTypes.forEach((recipe) => {
            recipesEl.appendChild(generateRecipeDOM(recipe))
        })
    } else {
        const noRecipesMessage = document.createElement('p')
        noRecipesMessage.setAttribute('id', 'no-recipe')
        recipes.length > 0 ? noRecipesMessage.textContent = 'There are no matching recipes' : noRecipesMessage.textContent = 'There are currently no recipes'
        recipesEl.appendChild(noRecipesMessage)
    }
    
}

// Generate DOM structure for ingredients
const generateIngredientsDOM = (ingredient) => {
    const ingredientEl = document.createElement('p')
    const checkbox = document.createElement('input')
    const ingredientName = document.createElement('text')
    const removeIngredientEl = document.createElement('button')
    const ingredients = getIngredients()
    checkbox.classList.add('checkbox-style')
    removeIngredientEl.classList.add('remove-style')
    ingredientEl.classList.add('single-step')

    

    // Wire up the checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ingredient.possess
    checkbox.addEventListener('change', (e) => {
        toggleIngredient(ingredient.id, ingredients)
        saveRecipes()
        renderIngredients(ingredients)
    })
    ingredientEl.appendChild(checkbox)

    // Set the ingredient name
    ingredientName.textContent = ingredient.name
    ingredientEl.appendChild(ingredientName)

    // Wire up the remove ingredient button
    removeIngredientEl.textContent = 'x'
    removeIngredientEl.addEventListener('click', (e) => {
        removeIngredient(ingredient.id, ingredients)
        saveRecipes()
        renderIngredients(ingredients)
    })
    ingredientEl.appendChild(removeIngredientEl)

    return ingredientEl
}


// Render the ingredients
const renderIngredients = (ingredients) => {
    const ingredientsEl = document.querySelector('#ingredients')
    const ingredientsName = document.querySelector('#new-ingredient')

    ingredientsEl.innerHTML = ''
    ingredientsName.innerHTML = ''
    console.log(ingredients)

        ingredients.forEach((ingredient) => {
            ingredientsEl.appendChild(generateIngredientsDOM(ingredient))
        })
    
    saveRecipes()
}

// Generate the DOM structure for recipe steps
const generateStepsDOM = (step) => {
    const stepEl = document.createElement('div')
    const individualStep = document.createElement('div')
    const stepCheckbox = document.createElement('input')
    const stepText = document.createElement('span')
    const number = document.createElement('input')
    const directions = document.createElement('p')
    const removeButton = document.createElement('button')
    const steps = getSteps()
    stepEl.setAttribute('id', 'step-element')
    individualStep.classList.add('single-step')
    stepCheckbox.classList.add('checkbox-style')
    directions.classList.add('step-directions')
    removeButton.classList.add('remove-style')
    
    
    // Setup the step completed checkbox
    stepCheckbox.setAttribute('type', 'checkbox')
    stepCheckbox.checked = step.completed
    stepCheckbox.addEventListener('change', (e) => {
        toggleStep(step.id, steps)
        if (step.completed=== true) {
            directions.style.textDecoration = 'line-through' 
            number.style.textDecoration = 'line-through'
            stepText.style.textDecoration = 'line-through'
        } else {
            directions.style.textDecoration = 'none'
            number.style.textDecoration = 'none'
            stepText.style.textDecoration = 'none'
        }
        saveRecipes()
    })
    individualStep.appendChild(stepCheckbox)

    stepText.textContent = 'Step '
    individualStep.appendChild(stepText)


    // Setup the step number
    number.setAttribute('class', 'number-el')
    number.value = step.number
    number.addEventListener('input', (e) => {
        if (!isNaN(e.target.value)) {
            const oldNum = step.number
            sameStepNum(parseInt(e.target.value), oldNum, steps)
            sortByNumber(steps)
            saveRecipes()
        }
    })
    individualStep.appendChild(number)

    // Setup directions element
    directions.textContent = step.text
    individualStep.appendChild(directions)

    // Setup the remove step button
    removeButton.textContent = 'x'
    removeButton.addEventListener('click', (e) => {
        removeStep(step.id, steps)
        saveRecipes()
        renderSteps(steps)
    })
    individualStep.appendChild(removeButton)
    stepEl.appendChild(individualStep)
    return stepEl

}


//Render the Steps
const renderSteps = (steps) => {
    const stepsEl = document.querySelector('#steps')
    stepsEl.innerHTML = ''

    steps.forEach((step) => {
        stepsEl.appendChild(generateStepsDOM(step))
    })

}

export { renderRecipes, changeColor, renderIngredients, renderSteps }