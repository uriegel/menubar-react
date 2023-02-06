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
            {items.map((n, i) => SubMenu({name: n.name, index: i, selectedIndex, subMenuOpened}))}
        </ul>
    )
}

export default Menubar