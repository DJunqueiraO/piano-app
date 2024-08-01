import {useEffect} from 'react'

export const useResize = (effect: () => void) => {
    useEffect(
        () => {
            effect()
            window.addEventListener('resize', effect)
            return () => window.removeEventListener('resize', effect)
        }, 
        []
    )
}