import React from 'react'
import { MenuItem } from './MenuItem'

interface SubMenuProps{
    name: string
}

export const SubMenu = ({name}: SubMenuProps) => {
    return (
        <MenuItem name={name} isAccelerated={false} />
    )
}
