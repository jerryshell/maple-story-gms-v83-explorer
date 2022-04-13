import './App.css'
import itemCategoryData from './data/ItemCategoryData.json'
import {useEffect, useState} from 'react'
import itemApi from './api/itemApi'
import ProjectInfo from './components/ProjectInfo'
import Disclaimer from './components/Disclaimer'

const itemCategoryLevel1List = Object.keys(itemCategoryData)

function App() {
    const [loadingFlag, setLoadingFlag] = useState(false)

    const [currentItemCategoryLevel1, setCurrentItemCategoryLevel1] = useState(itemCategoryLevel1List[3])

    const [itemCategoryLevel2List, setItemCategoryLevel2List] = useState<string[]>([])
    useEffect(() => {
        Object.entries(itemCategoryData).forEach(([key, value]) => {
            if (key === currentItemCategoryLevel1) {
                setItemCategoryLevel2List(Object.keys(value))
                return
            }
        })
    }, [currentItemCategoryLevel1])

    const [currentItemCategoryLevel2, setCurrentItemCategoryLevel2] = useState(itemCategoryLevel2List[0])
    useEffect(() => {
        setCurrentItemCategoryLevel2(itemCategoryLevel2List[0])
    }, [itemCategoryLevel2List])

    const [itemCategoryLevel3List, setItemCategoryLevel3List] = useState<string[]>([])
    useEffect(() => {
        Object.entries(itemCategoryData).forEach(([key, value]) => {
            if (key === currentItemCategoryLevel1) {
                Object.entries(value).forEach(([key2, value2]) => {
                    if (key2 === currentItemCategoryLevel2) {
                        setItemCategoryLevel3List(value2.map(item => item.item1))
                        return
                    }
                })
                return
            }
        })
    }, [currentItemCategoryLevel2])

    const [currentItemCategoryLevel3, setCurrentItemCategoryLevel3] = useState(itemCategoryLevel3List[0])
    useEffect(() => {
        setCurrentItemCategoryLevel3(itemCategoryLevel3List[0])
    }, [itemCategoryLevel3List])

    const [pageCount, setPageCount] = useState<number>(10)
    const [pageNumber, setPageNumber] = useState<number>(0)

    const [pageStartPosition, setPageStartPosition] = useState<number>(0)
    useEffect(() => {
        setPageStartPosition(pageNumber * pageCount)
    }, [pageCount, pageNumber])

    const fetchItemList = () => {
        setLoadingFlag(true)
        itemApi.search(pageCount, pageStartPosition, currentItemCategoryLevel1, currentItemCategoryLevel2, currentItemCategoryLevel3)
            .then(response => {
                const itemList = response.data
                console.log('itemList', itemList)
                setItemList(itemList)
            })
            .finally(() => {
                setLoadingFlag(false)
            })
    }
    useEffect(() => {
        fetchItemList()
    }, [pageStartPosition])

    const [itemList, setItemList] = useState<{ id: number, name: string }[]>([])
    useEffect(() => {
        if (currentItemCategoryLevel3) {
            fetchItemList()
        }
    }, [currentItemCategoryLevel3])

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

            <fieldset>
                <legend>Item</legend>
                <select
                    style={{display: 'inline'}}
                    value={currentItemCategoryLevel1}
                    onChange={e => setCurrentItemCategoryLevel1(e.target.value)}
                >
                    {itemCategoryLevel1List.map(itemCategoryLevel1 => (
                        <option
                            key={itemCategoryLevel1} value={itemCategoryLevel1}
                        >{itemCategoryLevel1}</option>
                    ))}
                </select>
                <select
                    style={{display: 'inline'}}
                    value={currentItemCategoryLevel2}
                    onChange={e => setCurrentItemCategoryLevel2(e.target.value)}
                >
                    {itemCategoryLevel2List.map(itemCategoryLevel2 => (
                        <option
                            key={itemCategoryLevel2} value={itemCategoryLevel2}
                        >{itemCategoryLevel2}</option>
                    ))}
                </select>
                <select
                    style={{display: 'inline'}}
                    value={currentItemCategoryLevel3}
                    onChange={e => setCurrentItemCategoryLevel3(e.target.value)}
                >
                    {itemCategoryLevel3List.map(itemCategoryLevel3 => (
                        <option
                            key={itemCategoryLevel3} value={itemCategoryLevel3}
                        >{itemCategoryLevel3}</option>
                    ))}
                </select>

                {
                    loadingFlag ?
                        <h2>Loading...</h2>
                        :
                        <table>
                            <thead>
                            <tr>
                                <th>Icon</th>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {itemList.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <img
                                            src={`https://maplestory.io/api/GMS/231/item/${item.id}/icon`}
                                            alt={item.name}
                                        />
                                    </td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                }

                <span>Current Page: {pageNumber + 1}</span>
                <span> </span>
                <button
                    onClick={() => {
                        if (pageNumber > 0) {
                            setPageNumber(pageNumber - 1)
                        }
                    }}
                    disabled={pageNumber === 0}
                >
                    Previous page
                </button>
                <button
                    onClick={() => {
                        setPageNumber(pageNumber + 1)
                    }}
                >
                    Next page
                </button>
            </fieldset>

            <Disclaimer/>

        </div>
    )
}

export default App
