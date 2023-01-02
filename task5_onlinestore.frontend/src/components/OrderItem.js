import { Card, Button } from "react-bootstrap";
import { useUser } from "../context/UserContext";
import OrderService from "../services/OrderService";

export function OrderItem({ id, userId, userName, totalCost, dateOfOrder, orderProducts }) {
    const orderService = new OrderService();
    const { user } = useUser();
    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-4">Ordered by: {userName}</span>
                    <span className="fs-4 text-muted">Total cost: {totalCost}$</span>
                </Card.Title>
                <Card.Text className="d-flex justify-content-between align-items-baseline mb-4">
                    Ordered on {dateOfOrder.split("T")[0]} {dateOfOrder.split("T")[1].split(".")[0]}
                    <div className="ms-auto">
                        <Button
                            onClick={() => changeOrderStatus("Accepted")}
                            style={{ width: "4rem", height: "3rem", position: "relative" }}
                            variant="outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#417505" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                        </Button>
                        <Button
                            onClick={() => changeOrderStatus("Rejected")}
                            style={{ width: "4rem", height: "3rem", position: "relative" }}
                            variant="outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 3h18v18H3zM15 9l-6 6m0-6l6 6" />
                            </svg>
                        </Button>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )

    async function changeOrderStatus(status) {
        if (window.confirm('Are you sure yyou want to set this order as ' + status)) {
            await orderService.changeOrderStatus(user.token, id, userId, totalCost, dateOfOrder, status)
                .then(res => {
                    if (!res.ok) throw new Error("Unauthorized")
                    else {
                        return res.text()
                    }
                })
                .then((result) => {
                    alert(result)
                }, (error) => {
                    alert(error)
                })
        }
    }
}