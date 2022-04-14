import './App.css'
import ProjectInfo from './components/ProjectInfo'
import Disclaimer from './components/Disclaimer'
import ItemCategoryTable from './components/ItemCategoryTable'

function App() {

    return (
        <div>
            <h1>
                <img
                    src="https://maplestory.io/api/GMS/231/mob/100004/render/stand"
                    alt="logo"
                />
                <span> </span>
                <span>MapleStory GMS V83 Explore</span>
            </h1>
            <ProjectInfo/>
            <ItemCategoryTable/>
            <Disclaimer/>
        </div>
    )
}

export default App
