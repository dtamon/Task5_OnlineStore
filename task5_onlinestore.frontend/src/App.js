import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { About } from "./pages/About"
import { Store } from "./pages/Store"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
    return (
        <ShoppingCartProvider>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<About />} />
                    <Route path="/store" element={<Store />} />
                </Routes>
            </Container>
        </ShoppingCartProvider>
    )
}

export default App