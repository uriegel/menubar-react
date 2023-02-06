import React from 'react'
import "./MenubarItem.css"
import { MenuItem } from './MenuItem'

interface MenubarItemProps {
    name: string
    isAccelerated: boolean
    selectedIndex: number
    index: number
}

export const MenubarItem = ({name, index, selectedIndex}: MenubarItemProps) => {

    const onClick = () => {
        document.dispatchEvent(new CustomEvent('menubar-clicked', {
            bubbles: true,
            composed: true,
            detail: { index: index }
        }))    
    }

    return (
        <li className={`mbr--menubaritem ${index == selectedIndex ? "selected" : ""}`} onClick={onClick}>
            <div className='mbr--header'>
                <MenuItem name={name} isAccelerated={false} />
            </div>
        </li>
    )
}
