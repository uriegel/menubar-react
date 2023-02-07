import { useEffect, useState } from 'react'
import './App.css'
import Menubar, { MenuItemType } from './component'

const App = () => {

	const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        
		const menuItemClick = (evt: Event) => {
			console.log("Click", (evt as CustomEvent).detail)
			if ((evt as CustomEvent).detail == "END")
				window.close()
        }

        document.addEventListener('menuitem-clicked', menuItemClick);
		return () => {
			document.removeEventListener('menuitem-clicked', menuItemClick)
        }
        
    }, [])

	return (
		<div className="App">
			<Menubar items={[{ 
				name: "_Datei",
				items: [{
						name: "_Umbenennen",
						type: MenuItemType.MenuItem,
						shortcut: "F2"
					}, {
						name: "Er_weitertes Umbenennen",
						type: MenuItemType.MenuItem,
						shortcut: "Strg+F2"
					}, { type: MenuItemType.Separator 
					}, {
						name: "_Kopieren",
						type: MenuItemType.MenuItem,
						shortcut: "F5"
					}, {
						name: "_Verschieden",
						type: MenuItemType.MenuItem,
						shortcut: "F6"
					}, {
						name: "_Löschen",
						type: MenuItemType.MenuItem,
						shortcut: "Ent"
					}, { type: MenuItemType.Separator 						
					}, {
						name: "_Ordner anlegen",
						type: MenuItemType.MenuItem,
						shortcut: "F7"
					}, {
						name: "_Eigenschaften",
						type: MenuItemType.MenuItem,
						shortcut: "Strg+Enter"
					}, {
						name: "Öffnen_mit",
						type: MenuItemType.MenuItem,
						shortcut: "Alt+Enter"
					}, { type: MenuItemType.Separator 						
					}, {
						name: "_Beenden",
						type: MenuItemType.MenuItem,
						key: "END",
						shortcut: "Alt+F4"
					}]
			}, { 
				name: "_Navigation",
				items: [{
						name: "_Favoriten",
						type: MenuItemType.MenuItem,
						shortcut: "F1"
					}, {
						name: "_Gleichen Ordner öffnen",
						type: MenuItemType.MenuItem,
						shortcut: "F9"
					}] 
				}, { 
					name: "_Selektion",
					items: [{
						name: "_Alles",
						type: MenuItemType.MenuItem,
						shortcut: "Num+"
					}, {
						name: "_Selektion entfernen",
						type: MenuItemType.MenuItem,
						shortcut: "Num-"
					}] 
				}, { 
					name: "_Ansicht",
					items: [{
						name: "_Versteckte Dateien",
						checked: isHidden,
						setChecked: setIsHidden,
						type: MenuItemType.MenuCheckItem,
						shortcut: "Strg+H"
					}, {
						name: "_Aktualisieren",
						type: MenuItemType.MenuItem,
						shortcut: "Strg+R"
					}, { type: MenuItemType.Separator 						
					}, { 
						name: "_Vorschau",
						type: MenuItemType.MenuItem,
						shortcut: "F3"
					}, { type: MenuItemType.Separator 						
					}, { 
						name: "Dunkles Thema",
						type: MenuItemType.MenuItem
					}, { type: MenuItemType.Separator 
					}, {
						name: "_Zoomlevel",
						type: MenuItemType.MenuItem
					}, {
						name: "_Vollbild",
						type: MenuItemType.MenuItem,
						shortcut: "F11"
					}, { type: MenuItemType.Separator 												
					}, { 
						name: "_Entwicklerwerkzeuge",
						type: MenuItemType.MenuItem
					}] 
			}]} />
			<div> 
			<h1>Menubar</h1>
			<div  id="absolute">Ich bin absolut! Ich bin absolut! Ich bin absolut! Ich bin absolut! Ich bin absolut! Ich bin absolut!</div>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</p>
			<p>
				<button>Erster</button>
				<button>Zweiter</button>
				<button>Dritter</button>
				<input type="checkbox" id="isHidden"/>
				<span>Versteckte Dateien</span>
				<input type="checkbox" id="showProperties"/>
				<span>Zeige Eigenschaften</span>
			</p>
			</div>		 
		</div>
	)
}

export default App
