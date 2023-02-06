import React, { useEffect, useState } from 'react'
import './Menubar.css'
import { SubMenu } from './SubMenu'

export enum MenuItemType {
    MenuItem,
    MenuCheckItem,
    Separator
}

export interface MenuItemProps{
    name?: string
    type: MenuItemType
    key?: string
}

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

    useEffect(() => {
        
        const clickedListener = (evt: Event) => {
            setSelectedIndex((evt as CustomEvent).detail.index)
            setSubMenuOpened(true)
        }

        const mouseOverListener = (evt: Event) => setSelectedIndex((evt as CustomEvent).detail.index)

        document.addEventListener('menubar-clicked', clickedListener);
        document.addEventListener('menubar-mouseover', mouseOverListener);
        return () => {
            document.removeEventListener('menubar-clicked', clickedListener)
            document.removeEventListener('menubar-clicked', mouseOverListener)
        }
        
    }, [])

    const onBlur = () => closeMenu()
    
    const closeMenu = () => {
        setSubMenuOpened(false)
        setSelectedIndex(-1)
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

// TODO Callbacks/events when clicked
// TODO Selector for checkbox / state
// TODO alt-> Menu opens with accelerators
// TODO Keyboard control mouse up/down in Submenu
// TODO Shortcuts
// TODO Accelerators
// TODO Theming
// TODO Automode
