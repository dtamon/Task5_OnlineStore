import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { About } from "./pages/About"
import { Store } from "./pages/Store"
import { AdminPanel } from "./pages/AdminPanel"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { UserProvider } from "./context/UserContext"

function App() {
    return (
        <UserProvider>
            <ShoppingCartProvider>
                <Navbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/adminPanel" element={<AdminPanel />} />
                        <Route path="/store" element={<Store />} />
                    </Routes>
                </Container>
            </ShoppingCartProvider>
        </UserProvider>
    )
}

export default App