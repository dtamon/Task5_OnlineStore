import React, { useEffect, useState } from "react"
import { Col, Row, Stack, Pagination, InputGroup, Form, Button } from "react-bootstrap";
import { StoreProduct } from "../components/StoreProduct";
import StoreService from "../services/StoreService";

export function Store() {
    const storeService = new StoreService();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [pages, setPages] = useState([]);
    const [totalPages, setTotalPages] = useState();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const [searchPhrase, setSearchPhrase] = useState("");
    const [searchCategory, setSearchCategory] = useState(0);
    const [searchBrand, setSearchBrand] = useState(0);
    const [priceRange, setPriceRange] = useState({ priceMin: 0, priceMax: 10000 });
    const [sortBy, setStortBy] = useState({ sortBy: "Cost", sortDirection: "ASC" });

    //pagination info
    const [pageInfo, setPageInfo] = useState([]);



    const fetchData = async () => {
        await storeService.getAllProducts(searchCategory, searchBrand, searchPhrase, priceRange.priceMin, priceRange.priceMax, sortBy.sortBy, sortBy.sortDirection, pageNumber, pageSize)
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
            .then(data => setCategories(data))

        await storeService.getAllBrands()
            .then(data => setBrands(data))
    };

    useEffect(() => {
        fetchData();
    }, [searchCategory, searchBrand, sortBy, pageNumber, pageSize])

    return (
        <>
            <div className="d-flex justify-content-between align-items-baseline">
                <h1>Products</h1>
                <InputGroup className="mb-3" style={{ width: "auto" }}>
                    <Form.Control type="text" placeholder="Search Phrase" onChange={e => setSearchPhrase(e.target.value)} value={searchPhrase} />
                    <Button onClick={() => { setPageNumber(1); fetchData(); }}>Search</Button>
                </InputGroup>
            </div>
            <div className="d-flex justify-content-between align-items-baseline">
                <h3 className="fs-5" style={{ width: "18rem" }}>
                    Showing records {pageInfo.itemsFrom}-{pageInfo.itemsTo} of {pageInfo.totalItemsCount}
                </h3>
                <InputGroup className="mb-3" style={{ width: "auto" }}>
                    <InputGroup.Text>Category</InputGroup.Text>
                    <Form.Select style={{ width: "auto" }}
                        onChange={e => { setSearchCategory(e.target.value); fetchData(); }}>
                        <option value="0">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                        ))}

                    </Form.Select>
                </InputGroup>

                <InputGroup className="mb-3" style={{ width: "auto" }}>
                    <InputGroup.Text>Brand</InputGroup.Text>
                    <Form.Select style={{ width: "auto" }}
                        onChange={e => { setSearchBrand(e.target.value); fetchData(); }}>
                        <option value="0">All Brands</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                        ))}

                    </Form.Select>
                </InputGroup>

                <InputGroup className="mb-3" style={{ width: "auto" }}>
                    <InputGroup.Text>Sort by</InputGroup.Text>
                    <Form.Select style={{ width: "auto" }}
                        onChange={(e) => {
                            let sortConditions = e.target.value.split(",");
                            setStortBy({ sortBy: sortConditions[0], sortDirection: sortConditions[1] });
                            fetchData();
                        }}>
                        <option value="Cost,ASC">Price ascending</option>
                        <option value="Cost,DESC">Price descending</option>
                        <option value="BrandName,ASC">Brand name alphabetical</option>
                        <option value="BrandName,DESC">Brand name reverse aplh</option>
                    </Form.Select>
                </InputGroup>

                <InputGroup className="mb-3" style={{ width: "auto" }}>
                    <InputGroup.Text>Price range</InputGroup.Text>
                    <Form.Control type="text" placeholder="min" value={priceRange.priceMin} style={{ width: "4.5rem" }} onChange={(e) => setPriceRange({ priceMin: e.target.value, priceMax: priceRange.priceMax })}></Form.Control>
                    <InputGroup.Text>-</InputGroup.Text>
                    <Form.Control type="text" placeholder="max" value={priceRange.priceMax} style={{ width: "4.5rem" }} onChange={(e) => setPriceRange({ priceMin: priceRange.priceMin, priceMax: e.target.value })}></Form.Control>
                </InputGroup>
            </div>

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
            <div className="d-flex justify-content-between align-items-baseline">
                <Pagination>
                    {paginationItems}
                </Pagination>
                <Form.Select style={{ width: "auto" }}
                    onChange={(e) => { setPageSize(e.target.value); setPageNumber(pageNumber > 1 ? 1 : pageNumber); fetchData(); }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </Form.Select >
            </div>
        )
    }
}