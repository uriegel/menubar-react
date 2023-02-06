import React from 'react'
import { MenubarItem } from './MenubarItem'
import "./SubMenu.css"

interface SubMenuComponentProps {
    name: string
    index: number
    selectedIndex: number
    subMenuOpened: boolean
}

export const SubMenu = ({name, index, selectedIndex, subMenuOpened}: SubMenuComponentProps) => {
    return (
        <MenubarItem key={index} name={name} index={index ?? -1} selectedIndex={selectedIndex} 
        isAccelerated={false} subMenuOpened={subMenuOpened} />
    )
}
