import React, { useEffect, useState } from "react";
import { Row, Stack, Col } from "react-bootstrap";
import { OrderItem } from "../components/OrderItem";
import { useUser } from "../context/UserContext";
import OrderService from "../services/OrderService";

export function UserOrders() {
    const orderService = new OrderService();
    const { user } = useUser();
    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        await orderService.getUserOrders(user.token)
            .then(data => {
                setOrders(data)
                console.log(data)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (

        <>
            {user !== undefined ?
                <>
                    <h1>Your Orders</h1>
                    {orders.length === 0 ?
                        <span className="fs-2 text-muted">Your order history is empty</span> :
                        <Row>
                            <Stack gap={3}>
                                {orders.map(order => (
                                    <Col key={order.id}>
                                        <OrderItem {...order} />
                                    </Col>
                                ))}
                            </Stack>
                        </Row>
                    }
                </>
                : <h1>You are not authenticated</h1>
            }
        </>
    )
}