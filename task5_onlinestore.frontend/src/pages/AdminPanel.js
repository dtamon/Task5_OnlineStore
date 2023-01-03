import React, { useEffect, useState } from "react";
import { Row, Stack, Col, Form, Pagination } from "react-bootstrap";
import { OrderItem } from "../components/OrderItem";
import { useUser } from "../context/UserContext";
import OrderService from "../services/OrderService";

export function AdminPanel() {
    const orderService = new OrderService();
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    //pagination info
    const [pageInfo, setPageInfo] = useState([]);

    const fetchData = async () => {
        await orderService.getOrders(user.token, pageNumber, pageSize)
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
            <h1>Orders</h1>
            <h3 className="fs-5">Showing records {pageInfo.itemsFrom}-{pageInfo.itemsTo} of {pageInfo.totalItemsCount}</h3>
            <Row>
                <Stack gap={3}>
                    {orders.map(order => (
                        <Col key={order.id}>
                            <OrderItem {...order} refresh={fetchData} />
                        </Col>
                    ))}
                    {renderPagination()}
                </Stack>
            </Row>
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