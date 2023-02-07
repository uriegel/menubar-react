import React from 'react'
import './MenuItem.css'

interface MenuItemProps {
    name: string
    isAccelerated: boolean
}

export const MenuItem = ({ name, isAccelerated }: MenuItemProps) => {
    
    const splitName = () => {
        const pos = name.indexOf('_')
        return pos != null 
        ? [name.substring(0, pos), name[pos+1], name.substring(pos+2)]
        : ["", "", name]
    }
    let [pre, acc, post] = splitName()

    return (
        <div className='mbr--menuitem'>
            <span className="mbr--pre">{pre}</span>
            <span className={isAccelerated ? 'mbr--accelerated' : ''}>{acc}</span>
            <span>{post}</span>
        </div>
    )
}
