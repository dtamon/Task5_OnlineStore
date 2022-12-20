import { useShoppingCart } from "../context/ShoppingCartContext";
import { Stack, Button } from "react-bootstrap";

export function CartItem({ id, quantity, cost, brandName, productName, description }) {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
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
                    <Button style={{ width: "3.5rem", height: "3.5rem", position: "relative" }}
                        variant="outline-none" onClick={() => removeFromCart(id)}>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                            id="IconChangeColor">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" id="mainIconPathAttribute"></path>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" id="mainIconPathAttribute"></path>
                        </svg>

                    </Button>
                </div>
                <div className="text-muted">
                    {(cost * quantity).toFixed(2)}$
                </div>
            </div>
        </Stack>
    )
}