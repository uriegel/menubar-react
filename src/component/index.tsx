import React, { useEffect, useState } from 'react'
import './Menubar.css'
import { SubMenu } from './SubMenu'

export enum MenuItemType {
    MenuItem,
    MenuCheckItem,
    Separator
}

interface SeparatorProps {
    type: MenuItemType.Separator
}

interface MenuClickItemProps {
    name?: string
    type: MenuItemType.MenuItem
    key?: string
}

interface MenuCheckItemProps{
    name?: string
    type: MenuItemType.MenuCheckItem
    checked: boolean
    setChecked: (val: boolean)=>void
}

export type MenuItemProps = MenuClickItemProps | MenuCheckItemProps | SeparatorProps

interface SubMenuProps{
    name: string
    items: MenuItemProps[]
}

interface MenubarProps {
    items: SubMenuProps[]
}

const Menubar = ({ items }: MenubarProps ) => {

    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [subMenuOpened, setSubMenuOpened] = useState(false)
    const [keyboardActivated, setKeyboardActivated] = useState(false)
    const [isAccelerated, setIsAccelerated] = useState(false)

    useEffect(() => {
        const clickedListener = (evt: Event) => {
            setSelectedIndex((evt as CustomEvent).detail.index)
            setSubMenuOpened(true)
        }

        const itemCloseListener = () => setTimeout(closeMenu)

        const mouseOverListener = (evt: Event) => setSelectedIndex((evt as CustomEvent).detail.index)
        
        document.addEventListener('menubar-clicked', clickedListener)
        document.addEventListener('menuitem-closed', itemCloseListener)
        document.addEventListener('menubar-mouseover', mouseOverListener)
        return () => {
            document.removeEventListener('menubar-clicked', clickedListener)
            document.removeEventListener('menuitem-closed', itemCloseListener)
            document.removeEventListener('menubar-clicked', mouseOverListener)
        }
        
    }, [])

    useEffect(() => {
        const keydownListener = (evt: KeyboardEvent) => {
            if (evt.key == "Alt" && !evt.repeat && evt.code == "AltLeft") {
                if (isAccelerated) {
                    closeMenu()
                    return
                }
                if (!keyboardActivated) {
                    if (selectedIndex == -1) {
                        setKeyboardActivated(true)
                        setSelectedIndex(0)
                    }
                    setIsAccelerated(true)
                    // TODO
                    //this.lastActive = document.activeElement as HTMLElement
                    //this.focus()
                }
                evt.preventDefault()
                evt.stopPropagation()                        
            }
            else if (evt.key == 'Escape') 
                closeMenu()
        }
        
        document.addEventListener('keydown', keydownListener)
        return () => {
            document.removeEventListener('keydown', keydownListener)
        }
        
    }, [isAccelerated, keyboardActivated, selectedIndex])

    const onBlur = () => closeMenu()
    
    const closeMenu = () => {
        setSubMenuOpened(false)
        setSelectedIndex(-1)
        setKeyboardActivated(false)
        setIsAccelerated(false)
    }

    return (
        <ul className="mbr--menubar" onBlur={onBlur} tabIndex={-1}>
            {items.map((n, i) =>
                (<SubMenu key={i} name={n.name} index={i} selectedIndex={selectedIndex} subMenuOpened = { subMenuOpened }
                items = { n.items } isAccelerated = {false} />)
            )}
        </ul>
    )
}

export default Menubar

// TODO Keyboard control mouse up/down in Submenu
// TODO Shortcuts
// TODO Accelerators
// TODO Theming
// TODO Automode
