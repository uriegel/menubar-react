import './App.css'
import Menubar from './component'

const App = () => {
	return (
		<div className="App">
			<Menubar items={[
				{ name: "_Datei" },
				{ name: "_Navigation" },
				{ name: "_Selektion" },
				{ name: "_Ansicht" },
				]} />
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
