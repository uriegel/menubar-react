import React from 'react'
import { MenuItemProps } from '.'
import { MenubarItem } from './MenubarItem'
import "./SubMenu.css"

interface SubMenuComponentProps {
    name: string
    index: number
    selectedIndex: number
    subMenuOpened: boolean
    items: MenuItemProps[]
}

export const SubMenu = ({name, index, selectedIndex, subMenuOpened, items}: SubMenuComponentProps) => {
    return (
        <MenubarItem key={index} name={name} index={index ?? -1} selectedIndex={selectedIndex} 
        isAccelerated={false} subMenuOpened={subMenuOpened} items={items} />
    )
}

// TODO: Not neccessary