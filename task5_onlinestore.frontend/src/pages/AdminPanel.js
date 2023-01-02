import React, { useEffect, useState } from "react";
import { Row, Stack, Col } from "react-bootstrap";
import { OrderItem } from "../components/OrderItem";
import { useUser } from "../context/UserContext";
import OrderService from "../services/OrderService";

export function AdminPanel() {
    const orderService = new OrderService();
    const { user } = useUser();
    const [orders, setOrders] = useState([]);

    const fetchData = async () => {
        await orderService.getOrders(user.token)
            .then(data => setOrders(data))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <h1>Orders List</h1>
            <Row>
                <Stack gap={3}>
                    {orders.map(order => (
                        <Col key={order.id}>
                            <OrderItem {...order} />
                        </Col>
                    ))}
                </Stack>
            </Row>
        </>
    )
}