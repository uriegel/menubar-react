import React, { useEffect, useState } from 'react'
import { MenuClickItemProps, MenuItemProps, MenuItemType } from '.'
import { MenuItem } from './MenuItem'
import { Separator } from './Separator'
import "./SubMenuList.css"

interface SubMenuListProps {
    items: MenuItemProps[]
    isAccelerated: boolean
    onAction: (key: string)=>void
}

export const SubMenuList = ({items, isAccelerated, onAction}: SubMenuListProps) => {

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
                if (item.type == MenuItemType.MenuItem)
                    onAction(item.key ?? item.name ?? "undefined")
                else if (item.type == MenuItemType.MenuCheckItem) 
                    item.setChecked(!item.checked)
                document.dispatchEvent(new CustomEvent('menuitem-closed', {
                    bubbles: true,
                    composed: true
                }))
            } else {
                const posarr = items
                    .map((n, i) => ({
                        name: n.type != MenuItemType.Separator ? n.name ?? "undefined" : "undefined",
                        key: n.type == MenuItemType.MenuItem ? n.key ?? undefined : undefined,
                        index: i,
                        type: n.type,
                        setChecked: n.type == MenuItemType.MenuCheckItem ? n.setChecked : undefined,
                        checked: n.type == MenuItemType.MenuCheckItem ? n.checked : undefined,
                    }))
                    .filter(n => n
                        .name
                        .toLocaleLowerCase()
                        .indexOf(`_${evt.key.toLocaleLowerCase()}`)!= -1)

                if (posarr.length > 1) {
                    let i = posarr.findIndex(n => n.index > selectedItem)
                    const newPos = i == -1 ? posarr[0].index : posarr[i].index
                    setSelectedItem(newPos)
                    evt.preventDefault()
                    evt.stopPropagation()
                } else if (posarr.length == 1) {
                    if (posarr[0].type == MenuItemType.MenuItem)
                        onAction(posarr[0].key ?? posarr[0].name)
                    else if (posarr[0].type == MenuItemType.MenuCheckItem && posarr[0].setChecked) 
                        posarr[0].setChecked(!posarr[0].checked)
                    document.dispatchEvent(new CustomEvent('menuitem-closed', {
                        bubbles: true,
                        composed: true
                    }))    
                    evt.preventDefault()
                    evt.stopPropagation()
                }
            }
        }
        
        document.addEventListener('keydown', keydownListener)
        return () => {
            document.removeEventListener('keydown', keydownListener)
        }
    }, [selectedItem, items, onAction])

    const onItemClick = (item: MenuItemProps) => {
        switch (item.type) {
            case MenuItemType.MenuItem:
                onAction((item as MenuClickItemProps).key ?? item.name ?? "undefined")
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
                        <MenuItem name={item.name ?? ""} isAccelerated={isAccelerated} />
                        <span className='mbr--spacer'></span>
                        <span className='mbr--shortcut'>{item.shortcut}</span>
                    </div>
                </div>)
                : (<Separator key={itemIndex} />)
            ))}
        </div>
    )
}