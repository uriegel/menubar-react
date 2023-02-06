import React from 'react'
import "./MenubarItem.css"
import { MenuItem } from './MenuItem'

interface MenubarItemProps {
    name: string
    isAccelerated: boolean
}

export const MenubarItem = ({name}: MenubarItemProps) => {
    return (
        <li className="mbr--menubaritem">
            <div className='mbr--header'>
                <MenuItem name={name} isAccelerated={false} />
            </div>
        </li>
    )
}
