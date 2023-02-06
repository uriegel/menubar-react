import React, { useEffect, useState } from 'react'
import './Menubar.css'
import { SubMenu } from './SubMenu'

interface SubMenuProps{
    name: string
}

interface MenubarProps {
    items: SubMenuProps[]
}

const Menubar = ({ items }: MenubarProps ) => {

    const closeMenu = () => {
        setSelectedIndex(-1)
    }

    const onBlur = () => closeMenu()
    
    useEffect(() => {
        const clickListener = (evt: Event) => setSelectedIndex((evt as CustomEvent).detail.index)
        document.addEventListener('menubar-clicked', clickListener);
        return () => document.removeEventListener('menubar-clicked', clickListener)
    }, [])
    
    const [selectedIndex, setSelectedIndex] = useState(-1)

    return (
        <ul className="mbr--menubar" onBlur={onBlur}>
            {items.map((n, i) => SubMenu({name: n.name, index: i, selectedIndex}))}
        </ul>
    )
}

export default Menubar