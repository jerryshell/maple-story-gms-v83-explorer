import api from './api'

export default {
    search(pageCount: number, pageStartPosition: number, overallCategoryFilter: string, categoryFilter: string, subCategoryFilter: string) {
        const url = `/api/GMS/83/item?count=${pageCount}&startPosition=${pageStartPosition}&overallCategoryFilter=${overallCategoryFilter}&categoryFilter=${categoryFilter}&subCategoryFilter=${subCategoryFilter}`
        return api.get(url)
    },
    count(overallCategoryFilter: string, categoryFilter: string, subCategoryFilter: string) {
        const url = `/api/GMS/83/item/count?overallCategoryFilter=${overallCategoryFilter}&categoryFilter=${categoryFilter}&subCategoryFilter=${subCategoryFilter}`
        return api.get(url)
    },
}
