import { useEffect, useState } from "react"

export const useLocalStorage = (initialState, localStorageProp) => {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(localStorageProp)
        return storedValue ? JSON.parse(storedValue) : initialState;
    })

    useEffect(() => {
        localStorage.setItem(localStorageProp, JSON.stringify(state))
    }, [state])

    return [state, setState]
}