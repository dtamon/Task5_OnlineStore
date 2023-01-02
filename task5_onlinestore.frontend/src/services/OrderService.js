export default class OrderService {
    async checkoutOrder(token, cartItems) {
        const response = await fetch('/api/store/purchase', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems)
        });
        return response;
    }
}