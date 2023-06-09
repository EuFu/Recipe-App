import { createRecipe } from './recipe.js'
import { getDietType, setDietType, setFilters } from './filters.js'
import { renderRecipes, changeColor } from './views.js'

renderRecipes()

// Update Filters with input in Search bar
document.querySelector("#search").addEventListener('input', (e) => {
    setFilters(e.target.value)
    renderRecipes()
})

// Update recipes when diet type selected
const checkboxes = document.querySelectorAll("input[type=checkbox][class=diet-select]")
const dietType = getDietType()
checkboxes.forEach((diet) => diet.checked = dietType[diet.id])
checkboxes.forEach((diet) => diet.addEventListener('change', (e) => {
    setDietType(diet);
    changeColor(dietType)
    renderRecipes()
}))

// Add a recipe with button click
document.querySelector('#add-button').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`../edit.html#${id}`)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes()
    }
})