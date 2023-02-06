import React, { useEffect, useRef, useState } from 'react'
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

    const menubar = useRef<HTMLUListElement>(null)

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
                    menubar.current?.focus()
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

    const selectNext = (next: boolean) => {
        let pos = selectedIndex + (next ? 1 : -1);
        if (pos < 0)
            pos = items.length - 1
        if (pos >= items.length)
            pos = 0
        setSelectedIndex(pos)
    }

    const onkeydown = (e: React.KeyboardEvent) => {
        if (e.code == "ArrowRight") {
            selectNext(true)
            e.preventDefault()
            e.stopPropagation()
        } else if (e.code == "ArrowLeft") {
            selectNext(false)
            e.preventDefault()
            e.stopPropagation()
        } else if (e.code == "ArrowDown" && !subMenuOpened) {
            setSubMenuOpened(true)
            e.preventDefault()
            e.stopPropagation()
        }
    }
    
    const closeMenu = () => {
        setSubMenuOpened(false)
        setSelectedIndex(-1)
        setKeyboardActivated(false)
        setIsAccelerated(false)
    }

    return (
        <ul ref={menubar} className="mbr--menubar" onBlur={onBlur} tabIndex={-1} onKeyDown={onkeydown}>
            {items.map((n, i) =>
                (<SubMenu key={i} name={n.name} index={i} selectedIndex={selectedIndex} subMenuOpened = { subMenuOpened }
                items = { n.items } isAccelerated = {false} />)
            )}
        </ul>
    )
}

export default Menubar

// TODO In SubMenu separate SubMenuList with seletedItem state
// TODO Shortcuts
// TODO Accelerators
// TODO focus last selected element
// TODO Theming
// TODO Automode
