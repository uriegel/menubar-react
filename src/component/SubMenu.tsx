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
    onAction: (key: string)=>void
}

export const SubMenu = ({name, index, selectedIndex, subMenuOpened, 
    items, isAccelerated, onAction }: SubMenuComponentProps) => {

    const onClick = () => {
        document.dispatchEvent(new CustomEvent('menubar-clicked', {
            bubbles: true,
            composed: true,
            detail: { index }
        }))    
    }

    const onMouseDown = () => {
        document.dispatchEvent(new CustomEvent('menubar-mousedown', {
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
                onClick={onClick} onMouseOver={onMouseOver} onMouseDown={onMouseDown}>
            <div className='mbr--header'>
                <MenuItem name={name} isAccelerated={isAccelerated} />
            </div>
            {selectedIndex == index && subMenuOpened 
            ? <div className='mbr--submenu'>
                <SubMenuList items={items} isAccelerated={isAccelerated} onAction={onAction} />
              </div>
            : null} 
        </li>
    )
}

