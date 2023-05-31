import uuidv4 from 'uuid/v4.js'
import { renderSteps } from './views.js'
import { saveRecipes } from './recipe.js'

// Remove help section with 'x' button click
const removeHelp = () => {
    const helpButton = document.querySelector('#help-button')
    const helpEl = document.querySelector('#help-area')
    if (helpButton.textContent ==="?") {
        const helpText = document.createElement('p')

        helpButton.textContent = "X";
        helpText.textContent = 'Forgot a step?\nClick and change a step number to the desired number, then click "Sort Order"'
        helpEl.appendChild(helpText)
    } else {
        helpButton.textContent = '?'
        helpEl.innerHTML = ''
    }
    // renderSteps(steps)
}

// Add a new step
const newStep = (recipe) => {
    const directions = document.querySelector('#step-text')
    const id = uuidv4()
    if (directions.textContent.length > 0) {
        recipe.steps.push({
            id,
            completed: false, 
            number: stepNumber(recipe.steps),
            text: `-   ${directions.textContent}`
        })
    }
    directions.innerHTML = ''
    saveRecipes()
    renderSteps(recipe.steps)
}

// Remove a step from steps list
const removeStep = (id, steps) => {
    const stepIndex = steps.findIndex((step) => step.id === id)

    if (stepIndex > -1) {
        steps.splice(stepIndex, 1)
    }
}

// Toggle step completed property
const toggleStep = (id, steps) => {
    const step = steps.find((step) => step.id === id)
    
    if (step) {
        step.completed = !step.completed
    }
}

// Determine step number
const stepNumber = (steps) => {
    if (steps.length > 0) {
        const numbersArray = []
        steps.forEach((step) => numbersArray.push(step.number))
        return Math.max(...numbersArray) + 1
    } else { 
        return 1
    }
    
}

// Sort Steps by number
const sortByNumber = (steps) => {
    const lastNumber = steps[steps.length - 1].number
    const duplicateNumber = steps.length !== new Set(steps.number).size
    if (steps.length !== lastNumber || duplicateNumber) {
        steps.forEach((step) => step.number = steps.indexOf(step) + 1)
    }
    steps.sort((a, b) => {
        if (parseInt(a.number) < parseInt(b.number)) {
            return -1
        } else if (parseInt(a.number) > parseInt(b.number)) {
            return 1
        } else {
            return 0
        }
    })
}

// Check if step number already exists
const sameStepNum = (num, oldNum, steps) => {
    const duplicateStep = steps.length !== new Set(steps.number).size

    if (duplicateStep) {
        const spot = steps.splice(oldNum-1, 1)
        steps.splice(num-1, 0, ...spot)
        }
}

export { removeHelp, newStep, removeStep, toggleStep, sortByNumber, sameStepNum }