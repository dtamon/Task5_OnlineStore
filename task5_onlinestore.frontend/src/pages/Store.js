import React, { useEffect, useState } from "react"
import { Col, Row, Stack, Pagination, InputGroup, Form, Button } from "react-bootstrap";
import { StoreProduct } from "../components/StoreProduct";
import StoreService from "../services/StoreService";

export function Store() {
    const storeService = new StoreService();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState([]);
    const [totalPages, setTotalPages] = useState();

    const [searchPhrase, setSearchPhrase] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchCategory, setSearchCategory] = useState(0);

    //page products info
    const [pageInfo, setPageInfo] = useState([])



    const fetchData = async () => {
        await storeService.getAllProducts(searchCategory, searchPhrase, pageNumber, pageSize)
            .then(data => {
                setProducts(data.items)
                setTotalPages(data.totalPages)
                setPages(pages)

                setPageInfo({
                    itemsFrom: data.itemsFrom,
                    itemsTo: data.itemsTo,
                    totalItemsCount: data.totalItemsCount
                })
            })
        await storeService.getAllCategories()
            .then(data => {
                setCategories(data)
            })
    };

    useEffect(() => {
        fetchData();
    }, [pageNumber])

    return (
        <>
            <h1>Product List</h1>
            <h3 className="fs-5">Showing records {pageInfo.itemsFrom}-{pageInfo.itemsTo} of {pageInfo.totalItemsCount}</h3>
            <InputGroup className="mb-3">
                <Form.Select style={{ width: "1rem" }} onChange={e => setSearchCategory(e.target.value)}>
                    <option value="0">All categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                    ))}

                </Form.Select>
                <Form.Control type="text" placeholder="Search Phrase" onChange={e => setSearchPhrase(e.target.value)} value={searchPhrase} />
                <Button onClick={() => { setPageNumber(1); fetchData(); }}>Search</Button>
            </InputGroup>

            <Row>
                <Stack gap={3}>
                    {products.map(product => (
                        <Col key={product.id}>
                            <StoreProduct {...product} />
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
            <Pagination>
                {paginationItems}
            </Pagination>
        )
    }
}