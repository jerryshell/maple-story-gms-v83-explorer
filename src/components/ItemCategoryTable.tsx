import {useEffect, useState} from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import atoms from '../atoms'
import itemApi from '../api/itemApi'

const ItemCategoryTable = () => {
    const [loadingFlag, setLoadingFlag] = useState(false)

    const itemCategoryData = useRecoilValue(atoms.itemCategoryData)

    const [itemCategoryLevel1List, setItemCategoryLevel1List] = useRecoilState(atoms.itemCategoryLevel1List)
    useEffect(() => {
        const itemCategoryLevel1List = Object.keys(itemCategoryData)
        setItemCategoryLevel1List(itemCategoryLevel1List)
    }, [itemCategoryData])

    const [currentItemCategoryLevel1, setCurrentItemCategoryLevel1] = useRecoilState(atoms.currentItemCategoryLevel1)
    useEffect(() => {
        setCurrentItemCategoryLevel1(itemCategoryLevel1List[0])
    }, [itemCategoryLevel1List])

    const [itemCategoryLevel2List, setItemCategoryLevel2List] = useRecoilState(atoms.itemCategoryLevel2List)
    useEffect(() => {
        Object.entries(itemCategoryData).forEach(([key, value]) => {
            if (key === currentItemCategoryLevel1) {
                setItemCategoryLevel2List(Object.keys(value))
                return
            }
        })
    }, [currentItemCategoryLevel1])

    const [currentItemCategoryLevel2, setCurrentItemCategoryLevel2] = useRecoilState(atoms.currentItemCategoryLevel2)
    useEffect(() => {
        setCurrentItemCategoryLevel2(itemCategoryLevel2List[0])
    }, [itemCategoryLevel2List])

    const [itemCategoryLevel3List, setItemCategoryLevel3List] = useRecoilState(atoms.itemCategoryLevel3List)
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

    const [currentItemCategoryLevel3, setCurrentItemCategoryLevel3] = useRecoilState(atoms.currentItemCategoryLevel3)
    useEffect(() => {
        setCurrentItemCategoryLevel3(itemCategoryLevel3List[0])
    }, [itemCategoryLevel3List])

    const [itemList, setItemList] = useState<{ id: number, name: string }[]>([])
    useEffect(() => {
        fetchItemList()
    }, [currentItemCategoryLevel3])

    const [itemTotalCount, setItemTotalCount] = useState<number>(0)

    const [pageSize, setPageSize] = useState<number>(10)

    const [pageNumber, setPageNumber] = useState<number>(0)

    const [pageStartPosition, setPageStartPosition] = useState<number>(0)
    useEffect(() => {
        setPageStartPosition(pageNumber * pageSize)
    }, [pageSize, pageNumber])

    const fetchItemList = () => {
        if (!currentItemCategoryLevel3) {
            return
        }
        setLoadingFlag(true)
        itemApi.search(pageSize, pageStartPosition, currentItemCategoryLevel1, currentItemCategoryLevel2, currentItemCategoryLevel3)
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

    const fetchItemTotalCount = () => {
        if (!currentItemCategoryLevel3) {
            return
        }
        itemApi.count(currentItemCategoryLevel1, currentItemCategoryLevel2, currentItemCategoryLevel3)
            .then(response => {
                const itemCount = response.data
                console.log('itemTotalCount', itemCount)
                setItemTotalCount(itemCount)
            })
    }
    useEffect(() => {
        fetchItemTotalCount()
    }, [currentItemCategoryLevel3])

    const [totalPageCount, setTotalPageCount] = useState<number>(0)
    useEffect(() => {
        setTotalPageCount(Math.ceil(itemTotalCount / pageSize))
    }, [itemTotalCount, pageSize])

    const [gotoPageNumber, setGotoPageNumber] = useState<number>(0)

    return (
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

            {loadingFlag && <h2>Loading...</h2>}

            <div>
                <span>Total Count: {itemTotalCount}</span>
                <span> | </span>
                <span>Total Page: {totalPageCount}</span>
                <span> | </span>
                <span>Current Page: {pageNumber + 1}</span>
                <span> | </span>
            </div>

            <fieldset>
                <legend>Goto page</legend>
                <input
                    value={gotoPageNumber}
                    type="number"
                    style={{display: 'inline'}}
                    onChange={e => setGotoPageNumber(parseInt(e.target.value))}
                />
                <button
                    onClick={() => {
                        setPageNumber(gotoPageNumber ? gotoPageNumber - 1 : 0)
                    }}
                >
                    Go
                </button>
            </fieldset>

            <div>
                <button
                    onClick={() => {
                        setPageNumber(Math.max(pageNumber - 1, 0))
                    }}
                    disabled={pageNumber <= 0}
                >
                    {'<'} Prev Page
                </button>
                <button
                    onClick={() => {
                        setPageNumber(pageNumber + 1)
                    }}
                >
                    Next page {'>'}
                </button>
            </div>
        </fieldset>
    )
}

export default ItemCategoryTable
