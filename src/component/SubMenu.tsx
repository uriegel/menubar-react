import React from 'react'
import { MenubarItem } from './MenubarItem'
import "./SubMenu.css"

interface SubMenuComponentProps {
    name: string
    index: number
    selectedIndex: number
}

export const SubMenu = ({name, index, selectedIndex}: SubMenuComponentProps) => {
    return (
        <MenubarItem name={name} index={index ?? -1} selectedIndex={selectedIndex} isAccelerated={false} />
    )
}
// TODO MenuItem onClick opens/closes SubMenu
// TODO SubMenu consists of MenuItems
