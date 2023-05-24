

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
    if (typeof(updates) === 'string') {
        filters.searchText = updates
    }
}

const getFilters = () => filters

const setDietType = (diet) => {
    dietType[diet.id] = !dietType[diet.id]
}

const getDietType = () => dietType

export { setFilters, getFilters, setDietType, getDietType }