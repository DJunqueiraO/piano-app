import { useState } from 'react'

export class UseStateObject<T> {

    get: () => T
    set: (value: T) => void

    constructor(
        get: () => T,
        set: (value: T) => void
    ) {
        this.get = get
        this.set = set
    }
}

export const useStateAsObject = function<T>(initialState: T)  {
    const [value, set] = useState(initialState)
    const get: () => T = () => (value)
    return new UseStateObject<T>(get, set)
}