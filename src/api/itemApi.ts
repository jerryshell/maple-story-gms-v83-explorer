import api from './api'

export default {
    search(pageCount: number, pageStartPosition: number, overallCategoryFilter: string, categoryFilter: string, subCategoryFilter: string) {
        return api.get(`/api/GMS/83/item?count=${pageCount}&startPosition=${pageStartPosition}&overallCategoryFilter=${overallCategoryFilter}&categoryFilter=${categoryFilter}&subCategoryFilter=${subCategoryFilter}`)
    },
}
