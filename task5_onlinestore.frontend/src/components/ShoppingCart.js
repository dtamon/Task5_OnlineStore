import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useUser } from "../context/UserContext";
import OrderService from "../services/OrderService";
import { CartItem } from "./CartItem";

export function ShoppingCart({ isOpen }) {
    const orderService = new OrderService()
    const { closeCart, cartItems, cartQuantity, clearCart, fetchByIds, fetchedItems } = useShoppingCart()
    const { user, openLoginForm } = useUser()
    return (
        <Offcanvas show={isOpen} onHide={closeCart} onShow={fetchByIds} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartQuantity <= 0 && (
                        <div className="ms-auto fs-5 text-muted">
                            There are no products in cart
                        </div>
                    )}

                    {fetchedItems.map(item => {
                        const props = { ...item, ...cartItems.find(i => i.id === item.id) }
                        return <CartItem key={item.id} {...props} />
                    })
                    }

                    <div className="ms-auto fw-bold fs-5">
                        Total {(cartItems.reduce((total, cartItem) => {
                            const item = fetchedItems.find(i => i.id === cartItem.id)
                            return total + (item?.cost || 0) * cartItem.quantity
                        }, 0)).toFixed(2)}$
                    </div>
                    {cartQuantity > 0 && (
                        <Button className="ms-auto" onClick={() => checkout()}>Buy</Button>
                    )}

                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )

    async function checkout() {
        console.log(user);
        if (user !== undefined) {
            await orderService.checkoutOrder(user.token, cartItems)
                .then(res => {
                    if (!res.ok) throw new Error("Unauthorized")
                    else {
                        clearCart()
                        return res.text()
                    }
                })
                .then((result) => {
                    alert(result)
                }, (error) => {
                    alert(error)
                })
        } else {
            openLoginForm()
        }


    }
}