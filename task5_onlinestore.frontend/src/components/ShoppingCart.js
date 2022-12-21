import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useUser } from "../context/UserContext";
import { CartItem } from "./CartItem";

export function ShoppingCart({ isOpen }) {
    const { closeCart, cartItems, cartQuantity, clearCart } = useShoppingCart()
    const { token, openLoginForm } = useUser()
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
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
                    {cartItems.map(item =>
                        <CartItem key={item.id} {...item} />
                    )}
                    <div className="ms-auto fw-bold fs-5">
                        Total {(cartItems.reduce((total, cartItem) => {
                            return total + (cartItem.cost || 0) * cartItem.quantity
                        }, 0)).toFixed(2)}$
                    </div>
                    {cartQuantity > 0 && (
                        <Button className="ms-auto" onClick={() => makePurchase()}>Buy</Button>
                    )}

                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )

    function makePurchase() {
        if (token !== undefined) {
            fetch('/api/store/purchase', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItems)
            })
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