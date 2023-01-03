export default class OrderService {
    async checkoutOrder(token, cartItems) {
        const response = await fetch('/api/order/purchase', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems)
        })
        return response;
    }

    async getOrders(token, pageNumber, pageSize) {
        const response = await fetch(`/api/order/ordered?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
        return await response.json();
    }

    async getUserOrders(token) {
        const response = await fetch('/api/order/userOrders', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
        return await response.json();
    }

    async changeOrderStatus(token, id, userId, totalCost, dateOfOrder, status) {
        const response = await fetch('/api/order', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                userId: userId,
                totalCost: totalCost,
                dateOfOrder: dateOfOrder,
                status: status
            })
        })
        return response;
    }
}