export default class StoreService {
    async getAllProducts(searchCategory, searchBrand, searchPhrase, priceMin, priceMax, sortBy, sortDirection, pageNumber, pageSize) {
        const response = await fetch(`/api/store?searchCategory=${searchCategory}&searchBrand=${searchBrand}&searchPhrase=${searchPhrase}&priceMin=${priceMin}&priceMax=${priceMax}&sortBy=${sortBy}&sortDirection=${sortDirection}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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

    async getAllBrands() {
        const response = await fetch(`/api/store/brands`, {
            method: 'GET'
        })
        return await response.json();
    }
}