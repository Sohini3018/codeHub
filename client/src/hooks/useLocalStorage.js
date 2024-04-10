const useLocalStorage = () => {

    const setItem = (key, value) => {
        if (!key || !value) {
            return
        }
        localStorage.setItem(key, JSON.stringify(value))
    }

    const getItem = (itemName) => {
        if (!itemName) {
            return null
        }
        let itemFound = localStorage.getItem(itemName)
        if (!itemFound) {
            return null
        }
        let parsedItem = JSON.parse(itemFound)
        return parsedItem
    }
    const deleteItem = (itemName) => {
        if (!itemName) {
            return
        }
        localStorage.removeItem(itemName)
    }
    const removeAll = () => {
        localStorage.clear()
    }
    return { setItem, getItem, deleteItem, removeAll }
}

export default useLocalStorage