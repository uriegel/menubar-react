import React from 'react'
import { MenuItemProps } from '.'
import { MenuItem } from './MenuItem'
import "./SubMenu.css"
import { SubMenuList } from './SubMenuList'

interface SubMenuComponentProps {
    name: string
    isAccelerated: boolean
    index: number
    selectedIndex: number
    subMenuOpened: boolean
    items: MenuItemProps[]
}

export const SubMenu = ({name, index, selectedIndex, subMenuOpened, items}: SubMenuComponentProps) => {

    const onClick = () => {
        document.dispatchEvent(new CustomEvent('menubar-clicked', {
            bubbles: true,
            composed: true,
            detail: { index }
        }))    
    }

    const onMouseOver = () => {
        if (subMenuOpened)
            document.dispatchEvent(new CustomEvent('menubar-mouseover', {
                bubbles: true,
                composed: true,
                detail: { index }
            }))    
    }

    return (
        <li className={`mbr--menubaritem ${index == selectedIndex ? "selected" : ""}`} 
                onClick={onClick} onMouseOver={onMouseOver}>
            <div className='mbr--header'>
                <MenuItem name={name} isAccelerated={false} />
            </div>
            {selectedIndex == index && subMenuOpened 
            ? <div className='mbr--submenu'>
                <SubMenuList items={items} />
              </div>
            : null} 
        </li>
    )
}

