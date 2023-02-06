import React from 'react'
import './MenuItem.css'

interface MenuItemProps {
    name: string
    isAccelerated: boolean
}

export const MenuItem = ({ name }: MenuItemProps) => {
    
    const removeUnderscore = (str: string) =>
        str.replace('_', '')

    return (
        <div className='mbr--menuitem'>
            {removeUnderscore(name)}
        </div>
    )
}
