import React from 'react'
import { MenubarItem } from './MenubarItem'
import "./SubMenu.css"

interface SubMenuProps{
    name: string
}

export const SubMenu = ({name}: SubMenuProps) => {
    return (
        <MenubarItem name={name} isAccelerated={false} />
    )
}
// TODO MenuItem onClick opens/closes SubMenu
// TODO SubMenu consists of MenuItems
