import React, { useEffect, useState } from "react"
import { Col, Row, Stack } from "react-bootstrap";
import { StoreProduct } from "../components/StoreProduct";

export function Store() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <h1>Microphones</h1>
            <Row>
                <Stack gap={3}>
                    {products.map(product => (
                        <Col key={product.id}>
                            <StoreProduct {...product} />
                        </Col>
                    ))}
                </Stack>
            </Row>
        </>
    )

    function getProducts() {
        fetch('/api/store', { method: 'GET' })
            .then(res => res.json())
            .then(data => setProducts(data))
    }
}