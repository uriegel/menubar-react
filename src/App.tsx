import './App.css'
import Menubar from './component'
import { SubMenu } from './component/SubMenu'

const App = () => {
	return (
		<div className="App">
			<Menubar>
				<SubMenu name="_Datei" />
				<SubMenu name="_Ansicht" />
				<SubMenu name="_Test"/>
			</Menubar>
		</div>
	)
}

export default App
