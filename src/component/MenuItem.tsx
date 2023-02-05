import React from 'react'

interface MenuItemProps {
    name: string
    isAccelerated: boolean
}

export const MenuItem = ({ name }: MenuItemProps) => {
    
    const removeUnderscore = (str: string) =>
        str.replace('_', '')

    return (
        <div>
            {removeUnderscore(name)}
        </div>
    )
}
