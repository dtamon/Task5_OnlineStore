import { useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { useUser } from "../context/UserContext";
import OrderService from "../services/OrderService";

export function OrderItem({ id, userId, userName, totalCost, dateOfOrder, status, orderProducts, refresh }) {
    const orderService = new OrderService();
    const { user } = useUser();
    const [isRendered, setIsRendered] = useState(false);
    return (
        <Card className="h-10">
            <Card.Body className="d-flex flex-column">
                {user.role === "Admin" ?
                    <>
                        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                            <span className="fs-4">Ordered by: {userName}</span>
                            <span className="fs-4 text-muted">Total cost: {totalCost.toFixed(2)}$</span>
                        </Card.Title>
                        <Card.Text className="d-flex justify-content-between align-items-baseline mb-4">
                            <span className="fs-4">Ordered on {dateOfOrder.split("T")[0]} at: {dateOfOrder.split("T")[1].split(".")[0]}</span>
                            <div className="ms-auto">
                                <Button
                                    onClick={() => {
                                        isRendered === false ? setIsRendered(true) : setIsRendered(false)
                                    }}
                                    style={{ width: "4rem", height: "3rem", position: "relative" }}
                                    variant="outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#4a90e2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </Button>
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
                        {renderProducts(isRendered)}
                    </> :
                    <>
                        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                            <span className="fs-4">Ordered on: {dateOfOrder.split("T")[0]} at: {dateOfOrder.split("T")[1].split(".")[0]}</span>
                            <span className="fs-4 text-muted">Status: {status}</span>
                            <span className="fs-4 text-muted">Total cost: {totalCost.toFixed(2)}$</span>
                        </Card.Title>
                        <Card.Text className="d-flex justify-content-between align-items-baseline mb-4">
                            {renderProducts(true)}
                        </Card.Text>
                    </>
                }
            </Card.Body>
        </Card>
    )

    async function changeOrderStatus(status) {
        if (window.confirm('Are you sure you want to set this order as ' + status)) {
            await orderService.changeOrderStatus(user.token, id, userId, totalCost, dateOfOrder, status)
                .then(res => {
                    if (!res.ok) throw new Error("Unauthorized")
                    else {
                        refresh()
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

    function renderProducts(isRendered) {
        if (isRendered)
            return (
                <Table striped bordered size="sm"
                // style={{ width: "auto" }}
                >
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Count</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderProducts.map(orderProduct => (
                            <tr key={orderProduct.id}>
                                <td>{orderProduct.productFullName}</td>
                                <td>{orderProduct.quantity} x {orderProduct.cost}$</td>
                                <td>{(orderProduct.quantity * orderProduct.cost).toFixed(2)}$</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
    }
}