import React, { ReactNode, useEffect, useRef, useState } from 'react'
import './Menubar.css'
import { checkShortcut, getShortcuts, Shortcut } from './shortcuts'
import { SubMenu } from './SubMenu'
import { SubMenuList } from './SubMenuList'

export enum MenuItemType {
    MenuItem,
    MenuCheckItem,
    Separator
}

interface SeparatorProps {
    type: MenuItemType.Separator
    invisible?: boolean
}

export interface MenuClickItemProps {
    name?: string
    type: MenuItemType.MenuItem
    key?: string
    shortcut?: string
    invisible?: boolean
}

interface MenuCheckItemProps{
    name?: string
    type: MenuItemType.MenuCheckItem
    checked: boolean
    toggleChecked: ()=>void
    shortcut?: string
    invisible?: boolean
}

export type MenuItemProps = MenuClickItemProps | MenuCheckItemProps | SeparatorProps

interface SubMenuProps{
    name: string
    items: MenuItemProps[]
}

interface MenubarProps {
    items: SubMenuProps[]
    onAction: (key: string) => void
    autoMode?: boolean
}

let shortcuts: Map<string, Shortcut[]> | null = null

const Menubar = ({ items, onAction, autoMode }: MenubarProps) => {

    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [subMenuOpened, setSubMenuOpened] = useState(false)
    const [keyboardActivated, setKeyboardActivated] = useState(false)
    const [isAccelerated, setIsAccelerated] = useState(false)
    const lastActive = useRef(null as HTMLElement| null)

    const menubar = useRef<HTMLUListElement>(null)
    
    if (shortcuts == null)
        shortcuts = getShortcuts(items.flatMap(n => n.items))

    useEffect(() => {

        const clickedListener = (evt: Event) => {
            setSelectedIndex((evt as CustomEvent).detail.index)
            setSubMenuOpened(true)
        }

        const mousedownListener = () =>  {
            if (!lastActive.current)
                lastActive.current = document.activeElement as HTMLElement
        }

        const itemCloseListener = () => setTimeout(closeMenu)

        const mouseOverListener = (evt: Event) => setSelectedIndex((evt as CustomEvent).detail.index)
        
        document.addEventListener('menubar-clicked', clickedListener)
        document.addEventListener('menubar-mousedown', mousedownListener)
        document.addEventListener('menuitem-closed', itemCloseListener)
        document.addEventListener('menubar-mouseover', mouseOverListener)
        return () => {
            document.removeEventListener('menubar-clicked', clickedListener)
            document.removeEventListener('menubar-mousedown', mousedownListener)
            document.removeEventListener('menuitem-closed', itemCloseListener)
            document.removeEventListener('menubar-clicked', mouseOverListener)
        }
        
    }, [])

    useEffect(() => {
        const keydownListener = (evt: KeyboardEvent) => {
            if (evt.key == "Alt" && !evt.repeat && evt.code == "AltLeft") {
                if (!keyboardActivated) 
                    setIsAccelerated(true)
                evt.preventDefault()
                evt.stopPropagation()                        
            }
            else if (evt.key == 'Escape') 
                closeMenu()
            else {
                const shortcutList = shortcuts?.get(evt.key)
                if (shortcutList) {
                    var menuItem = checkShortcut(evt, shortcutList)?.menuItem
                    if (menuItem?.type == MenuItemType.MenuItem) 
                        setTimeout(() => menuItem?.type == MenuItemType.MenuItem ? onAction(menuItem.key ?? menuItem.name ?? "undefined") : {})
                    else if (menuItem?.type == MenuItemType.MenuCheckItem) 
                        menuItem.toggleChecked()
                    if (menuItem)
                        closeMenu()
                }
            }
        }
        
        const keyupListener = (evt: KeyboardEvent) => {
            if (evt.key == "Alt" && !evt.repeat && evt.code == "AltLeft") {
                if (isAccelerated) {
                    if (!keyboardActivated) {
                        if (selectedIndex == -1) {
                            setKeyboardActivated(true)
                            setSelectedIndex(0)
                        }
                        lastActive.current = document.activeElement as HTMLElement
                        setTimeout(() => menubar.current?.focus())
                    } else 
                        closeMenu()
                } 
                evt.preventDefault()
                evt.stopPropagation()                        
            }
        }

        document.addEventListener('keydown', keydownListener)
        document.addEventListener('keyup', keyupListener)
        
        return () => {
            document.removeEventListener('keydown', keydownListener)
            document.removeEventListener('keyup', keyupListener)
        }
        
    }, [isAccelerated, keyboardActivated, selectedIndex, onAction])

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
        if (keyboardActivated) {
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
            } else if (!subMenuOpened) {
                const pos = items
                                .findIndex(n => n.name
                                                    .toLocaleLowerCase()
                                                    .indexOf(`_${e.key.toLocaleLowerCase()}`)!= -1)
                if (pos != -1) {
                    setSelectedIndex(pos)
                    setSubMenuOpened(true)
                    e.preventDefault()
                    e.stopPropagation()
                }
            }
        }
    }
    
    const closeMenu = () => {
        setSubMenuOpened(false)
        setSelectedIndex(-1)
        setKeyboardActivated(false)
        setIsAccelerated(false)
        if (lastActive.current)
            lastActive.current.focus()
        lastActive.current = null
    }

    return (
        !autoMode || autoMode && keyboardActivated
        ?
            <div className='mbr-menubar-container'>
                <ul ref={menubar} className="mbr--menubar" onBlur={onBlur} tabIndex={-1} onKeyDown={onkeydown}>
                    {items.map((n, i) =>
                        (<SubMenu key={i} name={n.name} index={i} selectedIndex={selectedIndex} subMenuOpened = { subMenuOpened }
                        items = { n.items } isAccelerated={isAccelerated} onAction={onAction} />)
                    )}
                </ul>
            </div>
        : <></>
    )
}

export default Menubar

interface ContextMenuControlProps {
    children: ReactNode
    items: MenuItemProps[]
}


export const ContextMenuControl = ({ items, children }: ContextMenuControlProps) => {
    const onAction = (k: string)=> {

    }

    const getContent = () => {
        let content = [] as any[]
        React.Children.forEach(children, child => 
            content.push(child)) 
        return content
    }

    const [ opened, setOpened] = useState(false)

    const onToggle = () => setOpened(!opened)

    return (
        <>
            <span className='mbr--context-menu-control'>
                <div className='mbr--submenu'>
                    { opened &&
                        (<SubMenuList items={items} isAccelerated={false} onAction={onAction} />)
                    }
                </div>    
            </span>
            {getContent() }
            <span onClick={onToggle} className='mbr--context-menu-control-toggle' ></span>
        </>
    )
}


// TODO Shortcuts not working for checkable menu items: global check state map as react state

