import { useShoppingCart } from "../context/ShoppingCartContext";
import { Stack, Button } from "react-bootstrap";

export function CartItem({ id, quantity, cost, brandName, productName }) {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

    return (
        <Stack direction="horizontal" gap={2} classname="d-flex align-items-center">
            <div className="me-auto">
                <div>
                    {brandName} {productName}
                </div>
                <div className="text-muted">
                    {cost}$
                </div>
            </div>
            <div className="mt-auto">
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ gap: ".5rem" }}>
                    <Button variant="outline-secondary" size="sm" style={{ height: "1.8rem", width: "1.8rem" }} onClick={() => decreaseCartQuantity(id)}>-</Button>
                    <div>
                        <span className="fs-5">{quantity}</span>
                    </div>
                    <Button variant="outline-secondary" size="sm" style={{ height: "1.8rem", width: "1.8rem" }} onClick={() => increaseCartQuantity(id)}>+</Button>
                    <Button variant="outline-danger" size="sm" style={{ height: "1.8rem", width: "1.8rem" }} onClick={() => removeFromCart(id)}>X</Button>
                </div>
                <div className="text-muted">
                    {(cost * quantity).toFixed(2)}$
                </div>
            </div>
        </Stack>
    )
}