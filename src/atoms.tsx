import {atom} from 'recoil'
import itemCategoryData from './data/ItemCategoryData.json'

export default {
    itemCategoryData: atom({
        key: 'itemCategoryData',
        default: itemCategoryData,
    }),
    itemCategoryLevel1List: atom<string[]>({
        key: 'itemCategoryLevel1List',
        default: [],
    }),
    currentItemCategoryLevel1: atom<string>({
        key: 'currentItemCategoryLevel1',
        default: '',
    }),
    itemCategoryLevel2List: atom<string[]>({
        key: 'itemCategoryLevel2List',
        default: [],
    }),
    currentItemCategoryLevel2: atom<string>({
        key: 'currentItemCategoryLevel2',
        default: '',
    }),
    itemCategoryLevel3List: atom<string[]>({
        key: 'itemCategoryLevel3List',
        default: [],
    }),
    currentItemCategoryLevel3: atom<string>({
        key: 'currentItemCategoryLevel3',
        default: '',
    }),
}
