import { MenuItemProps, MenuItemType } from "."

export type Shortcut = {
    ctrl: boolean
    shift: boolean
    alt: boolean
    numpad?: boolean
    val: string
    menuItem: MenuItemProps
} 

export const checkShortcut = (evt: KeyboardEvent, shortcuts: Shortcut[]) => {
    let result: Shortcut|null = null
    if (shortcuts) {
        if (shortcuts[0].val == '+') {
            if (shortcuts[0].numpad && evt.keyCode == 107) {
                evt.preventDefault()
                evt.stopPropagation()
                result = shortcuts[0]
            }
        }
        else if (shortcuts[0].val == '-') {
            if (shortcuts[0].numpad && evt.keyCode == 109) {
                evt.preventDefault()
                evt.stopPropagation()
                result = shortcuts[0]
            }
        } else {
            const shortcut = shortcuts.filter(n => n.ctrl == evt.ctrlKey && n!.alt == evt.altKey)
            if (shortcut.length == 1) {
                evt.preventDefault()
                evt.stopPropagation()
                result = shortcuts[0]
            }
        } 
    }
    return result
}

export const getShortcuts = (menuItems: MenuItemProps[]) => {
    const getShortcut = (menuItem: MenuItemProps):Shortcut|null|undefined => {

        const getKey = (k: string) => k.length == 1 ? k.toLowerCase() : k

        if (menuItem.type == MenuItemType.Separator)
            return null
        
        if (menuItem.shortcut == "Num+")
            return {
                ctrl: false,
                shift: false,
                alt: false,
                numpad: true,
                val: "+",
                menuItem
            }
        if (menuItem.shortcut == "Num-")
            return {
                ctrl: false,
                shift: false,
                alt: false,
                numpad: true,
                val: "-",
                menuItem
            }
        
        var parts = menuItem.shortcut?.split("+")
        if (parts?.length == 1)
            return {
                ctrl: false,
                shift: false,
                alt: false,
                val: getKey(parts[0]),
                menuItem
            }
        else if (parts != null)
            return {
                ctrl: parts[0] == "Strg" || parts[0] == "Ctrl",
                shift: parts[0] == "Shift",
                alt: parts[0] == "Alt",
                val: getKey(parts[1]),
                menuItem
            }
    }

    const shortcuts = new Map<string, Shortcut[]>()
    menuItems
        .map(getShortcut)
        .filter(n => n != null && n!= undefined)
        .forEach(n => {
            const list = shortcuts.get(n!.val)
            if (list)
                shortcuts.set(n!.val, [...list, n!])
            else
                shortcuts.set(n!.val, [n!])
            })

console.log("shortcuts", shortcuts)

    return shortcuts
}
