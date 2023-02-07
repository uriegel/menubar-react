import React, { useEffect, useState } from 'react'
import { MenuItemProps, MenuItemType } from '.'
import { MenuItem } from './MenuItem'
import { Separator } from './Separator'
import "./SubMenuList.css"

interface SubMenuListProps {
    items: MenuItemProps[]
}

export const SubMenuList = ({items}: SubMenuListProps) => {

    const [selectedItem, setSelectedItem] = useState(-1)

    useEffect(() => {
        const selectNext = (next: boolean, n: number = 1) => {
            let pos = selectedItem + (next ? n : -n);
            if (pos < 0)
                pos = items.length - 1
            if (pos >= items.length)
                pos = 0
            if (items[pos].type != MenuItemType.Separator)
                setSelectedItem(pos)
            else
                selectNext(next, 2)
        }

        const keydownListener = (evt: KeyboardEvent) => {
            if (evt.code == "ArrowDown") {
                selectNext(true)
                evt.preventDefault()
                evt.stopPropagation()
            } else if (evt.code == "ArrowUp") {
                selectNext(false)
                evt.preventDefault()
                evt.stopPropagation()
            } else if (evt.code == "Enter" || evt.code == "Space") {
                const item = items[selectedItem]
                if (item.type == MenuItemType.MenuItem) {
                    document.dispatchEvent(new CustomEvent('menuitem-clicked', {
                        bubbles: true,
                        composed: true,
                        detail: item.key ?? item.name
                    }))
                } else if (item.type == MenuItemType.MenuCheckItem) 
                    item.setChecked(!item.checked)
                document.dispatchEvent(new CustomEvent('menuitem-closed', {
                    bubbles: true,
                    composed: true
                }))
            }
        }
        
        document.addEventListener('keydown', keydownListener)
        return () => {
            document.removeEventListener('keydown', keydownListener)
        }
    }, [selectedItem, items])

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
        <div className='mbr--submenu_list'>
            {items.map((item, itemIndex) => (
                item.type != MenuItemType.Separator
                ? (<div 
                    key={itemIndex}
                    className={`mbr--submenu-item-container ${itemIndex == selectedItem ? "selected" : ""} ${item.type == MenuItemType.MenuCheckItem && item.checked ? "checked" : ""}`}
                    onMouseOver={() => setSelectedItem(itemIndex)} onClick={() => onItemClick(item)}>
                    <div className='mbr--submenu-item-content'>
                        <span className='mbr--submenu-item-check'>✓</span>
                        <MenuItem name={item.name ?? ""} isAccelerated={false} />
                    </div>
                </div>)
                : (<Separator key={itemIndex} />)
            ))}
        </div>
    )
}