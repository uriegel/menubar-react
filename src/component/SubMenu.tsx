import React from 'react'
import { MenuItemProps, MenuItemType } from '.'
import { MenuItem } from './MenuItem'
import { Separator } from './Separator'
import "./SubMenu.css"

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
                        {items.map((n, i) => (
                            <div className='mbr--submenu-item-container'>
                                {n.type == MenuItemType.Separator
                                ? (<Separator />)
                                : (<MenuItem name={n.name ?? ""} isAccelerated={false} />)}
                            </div>
                        ))}
                    </div>
                </div>
            : null} 
        </li>
    )
}

