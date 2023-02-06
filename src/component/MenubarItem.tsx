import React from 'react'
import { MenuItemProps } from '.'
import "./MenubarItem.css"
import { MenuItem } from './MenuItem'

interface MenubarItemProps {
    name: string
    isAccelerated: boolean
    selectedIndex: number
    index: number
    subMenuOpened: boolean
    items: MenuItemProps[]
}

export const MenubarItem = ({name, index, selectedIndex, subMenuOpened, items}: MenubarItemProps) => {

    const onClick = () => {
        document.dispatchEvent(new CustomEvent('menubar-clicked', {
            bubbles: true,
            composed: true,
            detail: { index: index }
        }))    
    }

    const onMouseOver = () => {
        if (subMenuOpened)
            document.dispatchEvent(new CustomEvent('menubar-mouseover', {
                bubbles: true,
                composed: true,
                detail: { index: index }
            }))    
    }

    return (
        <li className={`mbr--menubaritem ${index == selectedIndex ? "selected" : ""}`} 
                onClick={onClick} onMouseOver={onMouseOver}>
            <div className='mbr--header'>
                <MenuItem name={name} isAccelerated={false} />
            </div>
            {selectedIndex == index && subMenuOpened 
            ?
                <div className='mbr--submenu'>
                    <div className='mbr--submenu_list'>
                        {items.map((n, i) => MenuItem({ name: n.name ?? "", isAccelerated: false }))}
                    </div>
                </div>
            : null} 
        </li>
    )
}
