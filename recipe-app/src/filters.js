

const filters = {
    searchText: ''
}

const dietType = {
    meat: false,
    pescatarian: false,
    vegetarian: false, 
    vegan: false,
}

const setFilters = (updates) => {
    if (updates === 'string') {
        filters.searchText === updates
    }
    // filters.searchText = e.target.value
    // renderRecipes(recipes, filters, dietType)
}

const getFilters = () => filters

const setDietType = (diet) => {
    dietType[diet.id] = !dietType[diet.id]
}

const getDietType = () => dietType

export { setFilters, getFilters, setDietType, getDietType }