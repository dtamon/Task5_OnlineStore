import { createContext, useContext, useState } from "react"
import { LoginForm } from "../components/account/LoginForm"
const UserContext = createContext({})

export function useUser() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [token, setToken] = useState()

    const openForm = () => setIsOpen(true)
    const closeForm = () => setIsOpen(false)

    function changeUserEmail(email) {
        setEmail(email)
    }

    function changeUserPassword(password) {
        setPassword(password)
    }

    function changeUserToken(token) {
        // console.log(token)
        setToken(token)
    }

    return (
        <UserContext.Provider
            value={{
                changeUserEmail,
                changeUserPassword,
                changeUserToken,
                openForm,
                closeForm,
                email,
                password,
                token,
            }}
        >
            {children}
            <LoginForm isOpen={isOpen} />
        </UserContext.Provider>
    )
}