import React, { useEffect, useState } from "react";
import { Row, Stack, Col, Pagination, Form } from "react-bootstrap";
import { OrderItem } from "../components/OrderItem";
import { useUser } from "../context/UserContext";
import OrderService from "../services/OrderService";

export function UserOrders() {
    const orderService = new OrderService();
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    //pagination info
    const [pageInfo, setPageInfo] = useState([]);

    const fetchData = async () => {
        await orderService.getUserOrders(user.token, pageNumber, pageSize)
            .then(data => {
                setOrders(data.items)
                setTotalPages(data.totalPages)
                setPageInfo({
                    itemsFrom: data.itemsFrom,
                    itemsTo: data.itemsTo,
                    totalItemsCount: data.totalItemsCount
                })
            })
    }

    useEffect(() => {
        fetchData();
    }, [pageNumber, pageSize])

    return (

        <>
            {user !== undefined ?
                <>
                    <h1>Your Orders</h1>

                    {orders.length === 0 ?
                        <span className="fs-2 text-muted">Your order history is empty</span> :
                        <>
                            <h3 className="fs-5">Showing records {pageInfo.itemsFrom}-{pageInfo.itemsTo} of {pageInfo.totalItemsCount}</h3>
                            <Row>
                                <Stack gap={3}>
                                    {orders.map(order => (
                                        <Col key={order.id}>
                                            <OrderItem {...order} />
                                        </Col>
                                    ))}
                                    {renderPagination()}
                                </Stack>
                            </Row>
                        </>
                    }
                </>
                : <h1>You are not authenticated</h1>
            }
        </>
    )

    function renderPagination() {
        let paginationItems = []
        for (let number = 1; number <= totalPages; number++) {
            paginationItems.push(
                <Pagination.Item
                    key={number}
                    active={number === pageNumber}
                    onClick={() => {
                        setPageNumber(number);
                        fetchData();
                    }}>
                    {number}
                </Pagination.Item>
            );
        }
        return (
            <div className="d-flex justify-content-between align-items-baseline">
                <Pagination>
                    {paginationItems}
                </Pagination>
                <Form.Select style={{ width: "auto" }}
                    onChange={(e) => { setPageSize(e.target.value); setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber); fetchData(); }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </Form.Select >
            </div>
        )
    }
}