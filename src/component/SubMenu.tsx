import React, { useState } from 'react'
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

    const [selectedItem, setSelectedItem] = useState(-1)

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

    const onItemClick = (item: MenuItemProps) => {
        switch (item.type) {
            case MenuItemType.MenuItem:
                document.dispatchEvent(new CustomEvent('menuitem-clicked', {
                    bubbles: true,
                    composed: true,
                    detail: item.key ?? item.name
                }))    
                document.dispatchEvent(new CustomEvent('menuitem-closed', {
                    bubbles: true,
                    composed: true
                }))    
                break
            case MenuItemType.MenuCheckItem:
                item.setChecked(!item.checked)
                document.dispatchEvent(new CustomEvent('menuitem-closed', {
                    bubbles: true,
                    composed: true
                }))    
                break
        }
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
                        {items.map((n, i) =>
                            n.type != MenuItemType.Separator
                                ? (<div key={i}
                                    className={`mbr--submenu-item-container ${i == selectedItem ? "selected" : ""} ${n.type == MenuItemType.MenuCheckItem && n.checked ? "checked" : ""}`}
                                    onMouseOver={() => setSelectedItem(i)} onClick={() => onItemClick(n)}>
                                    <div className='mbr--submenu-item-content'>
                                        <span className='mbr--submenu-item-check'>✓</span>
                                        <MenuItem name={n.name ?? ""} isAccelerated={false} />
                                    </div>
                                </div>)
                                : (<Separator key={i} />)
                        )}
                    </div>
                </div>
            : null} 
        </li>
    )
}

