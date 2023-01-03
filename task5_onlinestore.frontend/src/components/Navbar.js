import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useUser } from "../context/UserContext"

export function Navbar() {
    const { user } = useUser()
    const { openCart, cartQuantity } = useShoppingCart()
    const { openLoginForm } = useUser()
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm shadow mb-3">
            <Container>
                <Nav className="me-auto fs-5">
                    <Nav.Link to="/" as={NavLink}
                        style={{ width: "3.5rem", height: "3.5rem", position: "relative" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" fill="#f50000"></path>
                        </svg>
                    </Nav.Link>
                    <Nav.Link to="/store" as={NavLink} >Store</Nav.Link>
                    {user !== undefined ?
                        user.role === "Admin" ?
                            <>
                                <Nav.Link to="/userOrders" as={NavLink} >Your Orders</Nav.Link>
                                <Nav.Link to="/adminPanel" as={NavLink} >Admin Panel</Nav.Link>
                            </>
                            : <Nav.Link to="/userOrders" as={NavLink} >Your Orders</Nav.Link>
                        : <></>}
                </Nav>
                <Button
                    onClick={openCart}
                    style={{ width: "3.5rem", height: "3.5rem", position: "relative" }}
                    variant="outline-none">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        fill="currentColor">
                        <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                    </svg>
                    {cartQuantity > 0 && (
                        <div
                            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                            style={{
                                color: "white",
                                width: "1.3rem",
                                height: "1.3rem",
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                transform: "translate(20%, 20%)",
                            }}>
                            {cartQuantity}
                        </div>
                    )}
                </Button>
                <Button
                    onClick={openLoginForm}
                    style={{ width: "3.6rem", height: "3.6rem", position: "relative" }}
                    variant="outline-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        id="IconChangeColor">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" id="mainIconPathAttribute"></path>
                    </svg>
                </Button>
            </Container>
        </NavbarBs>
    )
}