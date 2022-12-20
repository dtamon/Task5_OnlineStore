import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function StoreProduct({ id, brandId, brandName, productName, description, cost }) {
    const {
        increaseCartQuantity,
    } = useShoppingCart()
    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{brandName} {productName}</span>
                    <span className="fs-2 text-muted">{cost}$</span>
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <div className="mt-auto">
                    <Button onClick={() => increaseCartQuantity(id, brandName, productName, description, cost)}>
                        Add To Cart
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}