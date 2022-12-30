export default class StoreService {
    async getAllProducts(searchCategory, searchPhrase, pageNumber, pageSize) {
        const response = await fetch(`/api/store?searchCategory=${searchCategory}&searchPhrase=${searchPhrase}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET'
        })
        return await response.json();
    }

    async getProductById(id) {
        const response = await fetch(`/api/store/${id}`, {
            method: 'GET'
        })
        return await response.json();
    }

    async getAllCategories() {
        const response = await fetch(`/api/store/categories`, {
            method: 'GET'
        })
        return await response.json();
    }
}